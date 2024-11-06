import classnames from 'classnames/bind';
import style from './myPageMain.module.scss';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';
import Modal from '../../../../common/components/Modal/Modal';
import ModalContents from '../../../../common/components/Modal/ModalContents';
import { MyPageMainProps } from '../../types';
import { useEffect, useState } from 'react';
import { userLogout } from '../../../../api/service/authApi';

const cn = classnames.bind(style);

interface ItemProps {
  url: string;
  text: string;
  handleClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MyPageMain = ({ userProfile, setRenderComponent }: MyPageMainProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [appVersion, setAppVersion] = useState<string>('');

  useEffect(() => {
    window.kmpJsBridge?.callNative(
      'onGetAppVersion',
      '',
      function (data: string) {
        console.warn('앱 버전 데이터 확인', data);
        // 브릿징은 string 형태 외에 주고 받을 수 없음
        const parsedData = JSON.parse(data);
        console.warn('앱 버전 parsedData 데이터 확인', parsedData);
        setAppVersion(parsedData.version);
      }
    );
  }, []);

  const renderItem = ({ text, url, handleClick }: ItemProps) => {
    return (
      <a href={url} onClick={handleClick} className={cn('link')}>
        <span className={cn('text')}>{text}</span>
        <ArrowLeft24X24 className={cn('arrow_icon')} />
      </a>
    );
  };

  return (
    <div className={cn('my_page_main')}>
      <strong className={cn('title')}>마이페이지</strong>
      <div className={cn('profile_area')}>
        <div className={cn('thumbnail')}>
          <img src={userProfile.profile} alt="" className={cn('image')} />
        </div>
        <div className={cn('information')}>
          <strong className={cn('nickname')}>{userProfile.nickname}</strong>
          <div className={cn('email')}>{userProfile.email}</div>
        </div>
      </div>
      <div className={cn('button_area')}>
        <button
          type="button"
          className={cn('revise_button')}
          onClick={() => setRenderComponent('reviseProfile')}
        >
          프로필 수정
        </button>
      </div>
      {renderItem({
        text: '알림 설정',
        url: '/',
        handleClick: (e) => {
          e.preventDefault(); // href='/' 무효
          setRenderComponent('alarmSetting');
        },
      })}
      {/* 자주, 1:1, 앱 평가 외부링크 클릭시 브라우저가 따로 켜지는지..? */}
      <div className={cn('section')}>
        {renderItem({
          text: '자주 묻는 질문',
          url: 'https://www.notion.so/ko/templates/category/landing-pages',
        })}
        {renderItem({
          text: '1:1 문의',
          url: 'https://www.notion.so/ko/templates/category/landing-pages',
        })}
        {renderItem({
          text: '앱 평가',
          url: 'https://www.notion.so/ko/templates/category/landing-pages',
        })}
      </div>
      <div className={cn('section')}>
        {/* 아래 서비스 약관, 개인정보 처리방침, 공지사항 => 기획 및 퍼블 필요 */}
        {renderItem({ text: '서비스 약관', url: '/' })}
        {renderItem({ text: '개인정보 처리방침', url: '/' })}
        {renderItem({ text: '공지사항', url: '/' })}
        {/* 버전정보 브릿지 및 위치정보? 기획필요 */}
        <div className={cn('version_area')}>
          <div className={cn('version')}>
            버전정보<span className={cn('number')}>{appVersion}</span>
          </div>
          <div className={cn('text')}>강남구 근처</div>
        </div>
      </div>
      <div className={cn('account_area')}>
        <a
          href="/"
          className={cn('account_link')}
          onClick={(e) => {
            e.preventDefault(); // href='/' 무효
            setModalOpen(true);
          }}
        >
          로그아웃
        </a>
        {/* 계정 삭제 상세페이지 퍼블 필요(기획중..) */}
        <a
          href="/"
          className={cn('account_link')}
          onClick={(e) => {
            e.preventDefault(); // href='/' 무효
            setRenderComponent('deleteUser');
          }}
        >
          계정 삭제
        </a>
      </div>
      {/* 로그아웃 클릭 시 모달 */}
      {modalOpen && (
        <Modal>
          <ModalContents
            title="로그아웃"
            description="모이미에서 로그아웃할까요?"
            firstButton="아직이요"
            secondButton="로그아웃"
            onClickFirstButton={() => {
              setModalOpen(false);
            }}
            onClickSecondButton={() => {
              userLogout().then(() => {
                window.location.href = '/login'; // to SocialLogin
              });
            }}
          />
        </Modal>
      )}
    </div>
  );
};

MyPageMain.defaultProps = {
  userProfile: {
    profile: '',
    nickname: '',
    email: '',
  },
};

export default MyPageMain;
