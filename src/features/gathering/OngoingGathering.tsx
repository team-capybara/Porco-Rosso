import React, { useState } from 'react';
import classnames from 'classnames/bind';
import { OngoingGatheringProps } from './types/index';
import BackNavigation from '../auth/components/BackNavigation';
import styles from './ongoingGathering.module.scss';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import ParticipantList from './components/ParticipantList/ParticipantList';
import ScrollPhotoList from './components/PhotoList/ScrollPhotoList';
import RouteMap from './components/RouteMap/RouteMap';
import OngoingFooter from './components/OngoingFooter/OngoingFooter';

const cn = classnames.bind(styles);

// 진행 중 모임
const OngoingGathering = (props: OngoingGatheringProps) => {
  console.log(props);
  const [moimId] = useState<number>(1); //props로 변경될 수 있음

  return (
    <div className={cn('ongoing_gathering')}>
      <BackNavigation
        classNameForIconType="close_type"
        blindText="메인으로 이동"
      />
      <div className={cn('wrap_gathering_title')}>
        <GatheringTitle />
      </div>
      <section className={cn('section')}>
        <ParticipantList />
      </section>
      <section className={cn('section')}>
        <ScrollPhotoList />
      </section>
      <section className={cn('section')}>
        <RouteMap moimId={moimId} />
      </section>
      <div className={cn('button_area')}>
        <button type="button" className={cn('end_button')}>
          모임 종료
        </button>
      </div>
      <OngoingFooter />
    </div>
  );
};

export default OngoingGathering;
