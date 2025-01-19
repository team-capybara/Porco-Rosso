import classnames from 'classnames/bind';
import styles from './ongoingFooter.module.scss';
import IconCamera24X24 from '../../../../assets/svg/icon/IconCamera24X24';
import IconOut24X24 from '../../../../assets/svg/icon/IconOut24X24';
import { onNavigateCamera } from '../../../../bridge/ongoingBridge';
import { IGatheringInfo, ModalContentsProps } from '../../types';
import { onPopBridge } from '../../../../bridge/gatheringBridge';
import {
  getGatheringInfo,
  leaveMoim,
} from '../../../../api/service/gatheringApi';
import { getUserInfoId } from '../../../../common/utils/userInfo';

const cn = classnames.bind(styles);
interface OngoingFooterProps {
  moimId: number;
  setModal: React.Dispatch<React.SetStateAction<ModalContentsProps | null>>;
  setExitBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
  checkMoimOngoingStatus: () => void;
}
const OngoingFooter = (props: OngoingFooterProps) => {
  const { moimId, setModal, checkMoimOngoingStatus, setExitBtnClicked } = props;

  const exitYesOrNoModal: ModalContentsProps = {
    title: '모임을 나갈까요?',
    description: '모임에서 나가시면 다시 참여할 수 없어요.',
    firstButton: '취소',
    secondButton: '나가기',
    onClickFirstButton: () => {
      setModal(null);
    },
    onClickSecondButton: () => {
      setModal(memoryMoimYesOrNoModal);
    },
  };

  const exitDepenseModal: ModalContentsProps = {
    title: '모임을 나갈 수 없어요.',
    description: '혼자 남은 모임에서는 모임을 종료해 주세요.',
    firstButton: '확인',
    onClickFirstButton: () => {
      setModal(null);
    },
  };

  const memoryMoimYesOrNoModal: ModalContentsProps = {
    title: '나간 모임이 종료되면 내 추억에 남길까요?',
    description: '삭제하시면 오늘 모임에 대한 기록이 남지 않아요.',
    firstButton: '삭제',
    secondButton: '추억 남기기',
    onClickFirstButton: () => {
      checkMoimOngoingStatus();
      leaveMoim(moimId, true);
      onPopBridge();
      setModal(null);
    },
    onClickSecondButton: () => {
      checkMoimOngoingStatus();
      leaveMoim(moimId, false);
      onPopBridge();
      setModal(null);
    },
  };

  const exitMoim = async () => {
    setExitBtnClicked(true);
    // 최신 데이터를 불러와서 isOwnerLeftAlone 값을 업데이트
    const response: IGatheringInfo = await getGatheringInfo(moimId);
    const userId = await getUserInfoId();
    const isUserAndOwner = Number(userId) === response.owner?.userId;
    const isOwnerLeftAlone =
      response.participants?.length === 0 && isUserAndOwner;

    setTimeout(() => {
      if (isOwnerLeftAlone) {
        setModal(exitDepenseModal);
      } else {
        setModal(exitYesOrNoModal);
      }
      setExitBtnClicked(false);
    }, 0);
  };

  return (
    <div className={cn('ongoing_footer')}>
      <div className={cn('footer')}>
        <button
          type="button"
          className={cn('button', 'camera')}
          onClick={() => {
            checkMoimOngoingStatus();
            onNavigateCamera(moimId);
          }}
        >
          <IconCamera24X24 className={cn('icon')} />
          촬영하기
        </button>
        <button
          type="button"
          className={cn('button', 'out')}
          onClick={() => {
            checkMoimOngoingStatus();
            exitMoim();
          }}
        >
          <IconOut24X24 className={cn('icon')} />
          <span className={cn('blind')}>나가기</span>
        </button>
      </div>
    </div>
  );
};

export default OngoingFooter;
