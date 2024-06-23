import React from 'react';
import classnames from 'classnames/bind';
import { OngoingGatheringProps } from './types/index';
import BackNavigation from '../auth/components/BackNavigation';
import styles from './ongoingGathering.module.scss';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import ParticipantList from './components/ParticipantList/ParticipantList';
import ScrollPhotoList from './components/PhotoList/ScrollPhotoList';
import RouteMap from './components/RouteMap/RouteMap';
import OngoingFooter from './components/OngoingFooter/OngoingFooter';
import PhotoList from './components/PhotoList/PhotoList';
import PhotoCard from './components/PhotoList/PhotoCard/PhotoCard';

const cn = classnames.bind(styles);

const OngoingGathering = (props: OngoingGatheringProps) => {
  // 진행 중 모임 메인 화면
  const renderOngoingMain = () => {
    return (
      <>
        <BackNavigation
          classNameForIconType="close_type"
          blindText="메인으로 이동"
        />
        <div className={cn('wrap_gathering_title')}>
          <GatheringTitle
            title="모이미 제목인데요오오오ㅗ오 ㅇ ㄹㄴㅇㄴㄹ ㄴㅇ ㄹㅇㄴ ㄹㅇㄴ"
            description="2024년 5월 3일"
            hasRefreshButton={true}
          />
        </div>
        <section className={cn('section')}>
          <ParticipantList />
        </section>
        <section className={cn('section')}>
          <ScrollPhotoList />
        </section>
        <section className={cn('section')}>
          <RouteMap />
        </section>
        <div className={cn('button_area')}>
          <button type="button" className={cn('end_button')}>
            모임 종료
          </button>
        </div>
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
        />
        <div className={cn('wrap_gathering_title')}>
          <GatheringTitle title="순간 모음" description="42장의 사진" />
        </div>
        <div className={cn('wrap_photo_list')}>
          <PhotoList />
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
        <div className={cn('wrap_photo_card')}>
          <PhotoCard />
        </div>
        <div className={cn('wrap_scroll_photo_list')}>
          <ScrollPhotoList hiddenTitle={true} isMiniPhotoCard={true} />
        </div>
      </>
    );
  };

  console.log(props);
  return (
    <div className={cn('ongoing_gathering')}>
      {false && renderOngoingMain()}
      {true && renderPhotoList()}
      {false && renderPhotoDetail()}
      <OngoingFooter />
    </div>
  );
};

export default OngoingGathering;
