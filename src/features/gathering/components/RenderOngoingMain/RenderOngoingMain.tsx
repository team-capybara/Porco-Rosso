import classnames from 'classnames/bind';
import styles from '../../ongoingGathering.module.scss';
import { getDateFromDatetime } from '../../../../common/utils/dateUtils';
import GatheringTitle from '../GatheringTitle/GatheringTitle';
import BackNavigation from '../../../auth/components/signup/BackNavigation';
import ParticipantList from '../ParticipantList/ParticipantList';
import ScrollPhotoList from '../PhotoList/ScrollPhotoList';
import RouteMap from '../RouteMap/RouteMap';
import Modal from '../../../../common/components/Modal/Modal';
import ModalContents from '../../../../common/components/Modal/ModalContents';
import { useEffect, useState } from 'react';
import { IGatheringInfo, ongoingType } from '../../types';
import { getGatheringInfo } from '../../../../api/service/gatheringApi';

const cn = classnames.bind(styles);

interface RenderOngoingMainProps {
  moimId: number;
  setRenderComponent: React.Dispatch<React.SetStateAction<ongoingType>>;
}
const RenderOngoingMain = (props: RenderOngoingMainProps) => {
  const { moimId, setRenderComponent } = props;
  const [leaveModal, setLeaveModal] = useState<boolean>(false);
  const [gatheringInfoData, setGatheringInfoData] = useState<IGatheringInfo>();

  const setGatheringInfoDataFunc = async () => {
    const response: IGatheringInfo = await getGatheringInfo(moimId);
    setGatheringInfoData(response);
    console.log(gatheringInfoData);
  };

  const openLeaveModal = () => {
    setLeaveModal(true);
  };

  const closeLeaveModal = () => {
    setLeaveModal(false);
  };

  useEffect(() => {
    setGatheringInfoDataFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(gatheringInfoData);
  return (
    <>
      {gatheringInfoData ? (
        <>
          <BackNavigation
            classNameForIconType="close_type"
            blindText="메인으로 이동"
          />
          <div className={cn('wrap_gathering_title')}>
            <GatheringTitle
              title={gatheringInfoData?.title}
              description={getDateFromDatetime(gatheringInfoData?.startedAt)}
              hasRefreshButton={true}
              onClickRefreshButton={() => setGatheringInfoDataFunc()}
            />
          </div>
          <section className={cn('section')}>
            <ParticipantList
              hasAddButton={true}
              mode="read"
              moimStart={true}
              owner={gatheringInfoData?.owner}
              participantData={gatheringInfoData?.participants}
            />
          </section>
          <section className={cn('section')}>
            <ScrollPhotoList
              moimeId={'1'}
              hiddenTitle={false}
              isMiniPhotoCard={true}
              setRenderComponent={setRenderComponent}
            />
          </section>
          <section className={cn('section')}>
            <RouteMap
              locationSummary={gatheringInfoData?.location.name}
              moimId={moimId}
            />
          </section>
          <div className={cn('button_area')}>
            <button
              type="button"
              className={cn('end_button')}
              onClick={openLeaveModal}
            >
              모임 종료
            </button>
          </div>
          {leaveModal && (
            <Modal>
              <ModalContents
                title="모임을 종료하시겠어요?"
                description="모임이 종료되고 베스트 컷을 선정해요."
                firstButton="취소"
                secondButton="종료"
                onClickFirstButton={closeLeaveModal}
              />
            </Modal>
          )}
        </>
      ) : (
        <>데이터 불러오는데에 문제가 발생했습니다. </>
      )}
    </>
  );
};

export default RenderOngoingMain;
