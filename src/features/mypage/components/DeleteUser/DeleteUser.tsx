import classnames from 'classnames/bind';
import style from './deleteUser.module.scss';
import { UserProfile } from '../../../auth/types';
import { useState } from 'react';
import ModalContents from '../../../../common/components/Modal/ModalContents';
import Modal from '../../../../common/components/Modal/Modal';
import { userLogout, userWithdraw } from '../../../../api/service/authApi';
import { ModalContentsProps } from '../../../gathering/types';

const cn = classnames.bind(style);

interface DeleteUserProps {
  userProfile: UserProfile;
}

const DeleteUser = ({ userProfile }: DeleteUserProps) => {
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalContentsProps | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const requestWithdraw = async () => {
    if (!isAgree) {
      setModal({
        title: '안내사항에 먼저 동의해주세요',
        description:
          '안내사항에 먼저 동의해주셔야, 계정을 삭제하실 수 있습니다.',
        firstButton: '확인',
        onClickFirstButton: () => setShowModal(false),
      });
      setShowModal(true);
      return;
    }

    try {
      await userWithdraw(); // 외부 함수 호출
      let current = 5;
      setShowModal(true);
      const timerId = setInterval(function () {
        if (current == 0) {
          clearInterval(timerId);
          setShowModal(false);
          userLogout().then(() => {
            window.location.href = '/login'; // to SocialLogin
          });
        }
        setModal({
          title: '정상적으로 탈퇴되었어요.',
          description: '5초 뒤에 자동으로 로그인 화면으로 이동해요.',
          firstButton: '확인',
          onClickFirstButton: () => {
            userLogout().then(() => {
              window.location.href = '/login'; // to SocialLogin
            });
          },
        });
        current--;
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorCode = err.response?.data?.errorCode;
      if (errorCode === -21006) {
        setModal({
          title: '지금 계정을 삭제할 수 없어요.',
          description: '참가 중이거나 참가 예정인 모임이 있어요.',
          firstButton: '확인',
          onClickFirstButton: () => setShowModal(false),
        });
      } else if (errorCode === -20000) {
        setModal({
          title: '계정을 삭제할 수 없어요.',
          description: '등록되 회원이 아닙니다.',
          firstButton: '확인',
          onClickFirstButton: () => setShowModal(false),
        });
      } else {
        setModal({
          title: '계정을 삭제할 수 없어요.',
          description: '에러가 발생했습니다.',
          firstButton: '확인',
          onClickFirstButton: () => setShowModal(false),
        });
      }
      setShowModal(true);
    }
  };

  return (
    <div className={cn('delete_user')}>
      <strong className={cn('title')}>계정 삭제</strong>
      <div className={cn('user_profile')}>
        <div className={cn('thumbnail')}>
          <img src={userProfile.profile} alt="" className={cn('image')} />
        </div>
        <strong className={cn('nickname')}>{userProfile.nickname}</strong>
        <div className={cn('email')}>{userProfile.email}</div>
        <p className={cn('description')}>
          계정 삭제시 사용자는 탈퇴 처리되며,
          <br />
          모든 데이터는 복구할 수 없어요.
        </p>
      </div>
      <ul className={cn('caution_list')}>
        <li className={cn('item')}>
          친구, 모임, 통계 등 모든 데이터는 삭제돼요.
        </li>
        <li className={cn('item')}>친구의 과거 통계에서는 삭제되지 않아요.</li>
        <li className={cn('item')}>
          동일한 소셜 계정으로 가입해도 이전 데이터는 복구되지 않아요.
        </li>
      </ul>
      <div className={cn('wrap_condition')}>
        <div className={cn('button_area')}>
          {/* todo: 버튼 선택된 경우, selected 클래스 활성화 및 span.blind 노출 부탁드립니다. */}
          <button
            type="button"
            className={cn('button', { selected: isAgree })}
            onClick={() => {
              setIsAgree((prevState) => !prevState);
            }}
          >
            <span className={cn('blind')}>선택됨</span>
          </button>
          <div className={cn('text')}>
            안내사항을 모두 확인했으며, 이에 동의해요.
          </div>
        </div>
      </div>
      <div className={cn('wrap_delete_button')}>
        <div className={cn('inner')}>
          <button
            type="button"
            className={cn('delete_button')}
            onClick={() => requestWithdraw()}
          >
            계정 삭제하기
          </button>
        </div>
      </div>
      {showModal && modal && (
        <Modal>
          <ModalContents
            title={modal?.title}
            description={modal?.description}
            firstButton={modal?.firstButton}
            onClickFirstButton={modal?.onClickFirstButton}
          />
        </Modal>
      )}
    </div>
  );
};

export default DeleteUser;
