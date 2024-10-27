import { useEffect, useState } from 'react';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { getMoimStatus } from '../../api/service/gatheringApi';

const cn = classnames.bind(styles);

// 진행 중 모임 (moimStatus = Ongoing)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OngoingGathering = (_props: OngoingGatheringProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [renderComponent, setRenderComponent] =
    useState<ongoingType>('OngoingMain');
  const [moimId] = useState<number>(getmoimId(useLocation()));
  // const [moimId] = useState<number>(92);
  const [modal, setModal] = useState<ModalContentsProps | null>(null);
  const [inviteFriendOpen, setInviteFriendOpen] = useState<boolean>(false);

  useEffect(() => {
    // 쿼리스트링에 선택된 사진이 바뀔 때 photodetail로 변경
    if (renderComponent === 'PhotoDetail') return;

    const searchParams = new URLSearchParams(location.search);
    const selectedPhotoId = searchParams.get('selectedPhotoId');

    if (selectedPhotoId !== null && selectedPhotoId !== '-1') {
      setRenderComponent('PhotoDetail');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]); // location.search를 의존성으로 설정

  // 진행 중 모임 때 상태 확인 후 모임종료로 redirect 하는 로직 추가
  const checkMoimOngoingStatus = async () => {
    const status = await getMoimStatus(moimId);
    if (status == 'ONGOING') return;
    else {
      let current = 5;
      const timerId = setInterval(function () {
        if (current == 0) {
          clearInterval(timerId);
          navigate(`/ended-gathering?moimId=${moimId}`);
        }
        setModal({
          title: '모임이 종료되었습니다.',
          description: '5초 이내 모임종료 페이지로 이동됩니다.',
          firstButton: current.toString(),
          onClickFirstButton: () => {},
        });
        current--;
      }, 1000);
    }
  };

  useEffect(() => {
    checkMoimOngoingStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    moimId >= 0 && (
      <>
        <div className={cn('ongoing_gathering')}>
          {renderComponent === 'OngoingMain' && (
            <RenderOngoingMain
              moimStatus="ONGOING"
              moimId={moimId}
              setModal={setModal}
              checkMoimOngoingStatus={checkMoimOngoingStatus}
              setRenderOngoingComponent={setRenderComponent}
              inviteFriendOpen={inviteFriendOpen}
              setInviteFriendOpen={setInviteFriendOpen}
            />
          )}
          {renderComponent === 'PhotoList' && (
            <RenderPhotoList
              moimId={String(moimId)}
              setRenderComponent={setRenderComponent}
            />
          )}
          {renderComponent === 'PhotoDetail' && (
            <RenderPhotoDetail
              moimId={String(moimId)}
              setRenderComponent={setRenderComponent}
            />
          )}
          {!inviteFriendOpen && (
            <OngoingFooter
              moimId={moimId}
              setModal={setModal}
              checkMoimOngoingStatus={checkMoimOngoingStatus}
            />
          )}
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
