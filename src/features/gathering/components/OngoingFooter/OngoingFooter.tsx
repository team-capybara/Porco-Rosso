import classnames from 'classnames/bind';
import styles from './ongoingFooter.module.scss';
import IconCamera24X24 from '../../../../assets/svg/icon/IconCamera24X24';
import IconOut24X24 from '../../../../assets/svg/icon/IconOut24X24';
import { onNavigateCamera } from '../../../../bridge/ongoingBridge';
import { ModalContentsProps } from '../../types';
import { onPopBridge } from '../../../../bridge/gatheringBridge';
import { deleteMoim } from '../../../../api/service/gatheringApi';

const cn = classnames.bind(styles);
interface OngoingFooterProps {
  moimId: number;
  setModal: React.Dispatch<React.SetStateAction<ModalContentsProps | null>>;
  checkMoimOngoingStatus: () => void;
}
const OngoingFooter = (props: OngoingFooterProps) => {
  const { moimId, setModal, checkMoimOngoingStatus } = props;

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

  const memoryMoimYesOrNoModal: ModalContentsProps = {
    title: '나간 모임이 종료되면 내 추억에 남길까요?',
    description: '삭제하시면 오늘 모임에 대한 기록이 남지 않아요.',
    firstButton: '삭제',
    secondButton: '추억 남기기',
    onClickFirstButton: () => {
      checkMoimOngoingStatus();
      deleteMoim(moimId);
      onPopBridge();
      setModal(null);
    },
    onClickSecondButton: () => {
      checkMoimOngoingStatus();
      // TODO : 추억 남기기 api 호출
      onPopBridge();
      setModal(null);
    },
  };
  const exitMoim = () => {
    setModal(exitYesOrNoModal);
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
