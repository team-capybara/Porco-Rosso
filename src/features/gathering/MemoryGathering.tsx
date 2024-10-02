import { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './ongoingGathering.module.scss';
import RenderOngoingMain from './components/RenderOngoingMain/RenderOngoingMain';
import Share from './Share';
import { memoryType } from './types';
import { getmoimId } from '../../common/utils/queryString';
import { useLocation } from 'react-router-dom';

const cn = classnames.bind(styles);

interface MemoryGatheringProps {}

// 모임 종료 후 생성된 추억조회. status = 'COMPLETED'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MemoryGathering = (_props: MemoryGatheringProps) => {
  const [renderComponent, setRenderComponent] = useState<memoryType>('Memory');
  const [moimId] = useState<number>(getmoimId(useLocation()));

  return (
    <div className={cn('ongoing_gathering')}>
      {renderComponent === 'Memory' && (
        <RenderOngoingMain
          moimStatus="COMPLETED"
          moimId={moimId}
          setRenderMemoryComponent={setRenderComponent}
        />
      )}
      {/* 공유하기 부분 연결 필요 */}
      {renderComponent === 'Share' && <Share />}
    </div>
  );
};

export default MemoryGathering;
