import React from 'react';
import { OngoingGatheringProps } from './types/index';

const OngoingGathering = (props: OngoingGatheringProps) => {
  console.log(props);
  return (
    <div>
      <h1>Ongoing Gathering Page</h1>
      {/* 진행중인 모임 페이지 */}
    </div>
  );
};

export default OngoingGathering;
