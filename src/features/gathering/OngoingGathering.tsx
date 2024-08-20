import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { OngoingGatheringProps, ongoingType } from './types/index';
import BackNavigation from '../auth/components/signup/BackNavigation';
import styles from './ongoingGathering.module.scss';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import ParticipantList from './components/ParticipantList/ParticipantList';
import ScrollPhotoList from './components/PhotoList/ScrollPhotoList';
import RouteMap from './components/RouteMap/RouteMap';
import OngoingFooter from './components/OngoingFooter/OngoingFooter';
import PhotoList from './components/PhotoList/PhotoList';
import Modal from '../../common/components/Modal/Modal';
import ModalContents from '../../common/components/Modal/ModalContents';
import { getGatheringInfo } from '../../api/service/gatheringApi';
import { getDateFromDatetime } from '../../common/utils/dateUtils';

const cn = classnames.bind(styles);

// 진행 중 모임
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OngoingGathering = (props: OngoingGatheringProps) => {
  // todo: 마크업 테스트용 코드입니다. 개발 시 제거해도 무방합니다.
  const [leaveModal, setLeaveModal] = useState<boolean>(false);
  const [renderComponent, setRenderComponent] =
    useState<ongoingType>('OngoingMain');
  const [moimId] = useState<number>(1); //props로 변경될 수 있음
  const { data: gatheringInfoData, refetch: refetchGatheringInfo } =
    getGatheringInfo(1);

  const openLeaveModal = () => {
    setLeaveModal(true);
  };

  const closeLeaveModal = () => {
    setLeaveModal(false);
  };

  const PhotoListBackNavigationClickHandler = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setRenderComponent('OngoingMain');
  };

  useEffect(() => {
    refetchGatheringInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 진행 중 모임 메인 화면
  const renderOngoingMain = () => {
    console.log(gatheringInfoData);
    return (
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
            onClickRefreshButton={() => refetchGatheringInfo()}
          />
        </div>
        <section className={cn('section')}>
          <ParticipantList
            hasAddButton={true}
            mode="read"
            moimStart={true}
            participantData={gatheringInfoData?.participants}
          />
        </section>
        <section className={cn('section')}>
          <ScrollPhotoList
            moimeId={'1'}
            hiddenTitle={false}
            isMiniPhotoCard={true}
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
    );
  };

  // 진행 중 모임 순간 모음
  const renderPhotoList = () => {
    return (
      <>
        <BackNavigation
          classNameForIconType="arrow_type"
          blindText="이전으로"
          isButton={true}
          onClick={PhotoListBackNavigationClickHandler}
        />
        <div className={cn('wrap_gathering_title')}>
          <GatheringTitle title="순간 모음" description="42장의 사진" />
        </div>
        <div className={cn('wrap_photo_list')}>
          <PhotoList moimeId={'1'} setRenderComponent={setRenderComponent} />
        </div>
      </>
    );
  };

  // 진행 중 모임 사진 상세페이지
  const renderPhotoDetail = () => {
    return (
      <>
        <BackNavigation
          classNameForIconType="arrow_type"
          blindText="이전으로"
        />
        <div className={cn('wrap_gathering_title')}>
          <GatheringTitle
            title="모이미 제목인데요오오오ㅗ오 ㅇ ㄹㄴㅇㄴㄹ ㄴㅇ ㄹㅇㄴ ㄹㅇㄴ"
            description="2024년 5월 3일"
            hasShareButton={true}
          />
        </div>
        {/* <div className={cn('wrap_photo_card')}>
          <PhotoCard />
        </div> */}
        <div className={cn('wrap_scroll_photo_list')}>
          <ScrollPhotoList
            moimeId={'1'}
            hiddenTitle={true}
            isMiniPhotoCard={true}
          />
        </div>
      </>
    );
  };

  // console.log(props);

  return (
    <div className={cn('ongoing_gathering')}>
      {renderComponent === 'OngoingMain' && renderOngoingMain()}
      {renderComponent === 'PhotoList' && renderPhotoList()}
      {renderComponent === 'PhotoDetail' && renderPhotoDetail()}
      <OngoingFooter />
    </div>
  );
};

export default OngoingGathering;
