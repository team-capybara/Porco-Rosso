import React from 'react';
import { UpcomingGatheringProps } from './types/index';

const UpcomingGathering = (props: UpcomingGatheringProps) => {
  console.log(props);
  return (
    <div>
      <h1>UpcomingGathering Page</h1>
      {/* 진행 전 다가오는 모임 페이지 */}
    </div>
  );
};

export default UpcomingGathering;
