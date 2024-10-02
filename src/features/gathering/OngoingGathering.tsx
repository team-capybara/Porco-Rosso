import { useState } from 'react';
import classnames from 'classnames/bind';
import {
  ModalContentsProps,
  OngoingGatheringProps,
  ongoingType,
} from './types/index';
import styles from './ongoingGathering.module.scss';
import OngoingFooter from './components/OngoingFooter/OngoingFooter';
import RenderOngoingMain from './components/RenderOngoingMain/RenderOngoingMain';
import RenderPhotoList from './components/RenderPhotoList/RenderPhotoList';
import RenderPhotoDetail from './components/RenderPhotoDetail/RenderPhotoDetail';
import { getmoimId } from '../../common/utils/queryString';
import Modal from '../../common/components/Modal/Modal';
import ModalContents from '../../common/components/Modal/ModalContents';
import { useLocation } from 'react-router-dom';

const cn = classnames.bind(styles);

// 진행 중 모임 (moimStatus = Ongoing)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OngoingGathering = (_props: OngoingGatheringProps) => {
  const [renderComponent, setRenderComponent] =
    useState<ongoingType>('OngoingMain');
  const [moimId] = useState<number>(getmoimId(useLocation())); //props로 변경될 수 있음
  const [modal, setModal] = useState<ModalContentsProps | null>(null);

  // const openLeaveModal = () => {
  //   setLeaveModal(true);
  // };

  // const closeLeaveModal = () => {
  //   setLeaveModal(false);
  // };
  return (
    moimId >= 0 && (
      <>
        <div className={cn('ongoing_gathering')}>
          {renderComponent === 'OngoingMain' && (
            <RenderOngoingMain
              moimStatus="ONGOING"
              moimId={moimId}
              setModal={setModal}
              setRenderOngoingComponent={setRenderComponent}
            />
          )}
          {renderComponent === 'PhotoList' && (
            <RenderPhotoList setRenderComponent={setRenderComponent} />
          )}
          {renderComponent === 'PhotoDetail' && (
            <RenderPhotoDetail setRenderComponent={setRenderComponent} />
          )}
          <OngoingFooter moimId={moimId} setModal={setModal} />
        </div>
        {modal && (
          <Modal>
            <ModalContents
              title={modal.title}
              description={modal.description}
              firstButton={modal.firstButton}
              secondButton={modal.secondButton}
              onClickFirstButton={modal.onClickFirstButton}
              onClickSecondButton={modal.onClickSecondButton}
            />
          </Modal>
        )}
      </>
    )
  );
};

export default OngoingGathering;
