import { EndedGatheringProps } from './types/index';

const EndedGathering = (props: EndedGatheringProps) => {
  console.log(props);
  return (
    <div>
      <h1>Ended Gathering Page</h1>
      {/* 모임 종료 후 추억 조회 페이지 */}
    </div>
  );
};

export default EndedGathering;
