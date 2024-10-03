import { useState } from 'react';
import classnames from 'classnames/bind';
import { OngoingGatheringProps, ongoingType } from './types/index';
import styles from './ongoingGathering.module.scss';
import OngoingFooter from './components/OngoingFooter/OngoingFooter';
import RenderOngoingMain from './components/RenderOngoingMain/RenderOngoingMain';
import RenderPhotoList from './components/RenderPhotoList/RenderPhotoList';
import RenderPhotoDetail from './components/RenderPhotoDetail/RenderPhotoDetail';

const cn = classnames.bind(styles);

// 진행 중 모임 (moimStatus = Ongoing)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OngoingGathering = (_props: OngoingGatheringProps) => {
  const [renderComponent, setRenderComponent] =
    useState<ongoingType>('OngoingMain');
  const [moimId] = useState<number>(1); //props로 변경될 수 있음

  return (
    <div className={cn('ongoing_gathering')}>
      {renderComponent === 'OngoingMain' && (
        <RenderOngoingMain
          moimStatus="ONGOING"
          moimId={moimId}
          setRenderOngoingComponent={setRenderComponent}
        />
      )}
      {renderComponent === 'PhotoList' && (
        <RenderPhotoList setRenderComponent={setRenderComponent} />
      )}
      {renderComponent === 'PhotoDetail' && (
        <RenderPhotoDetail setRenderComponent={setRenderComponent} />
      )}
      <OngoingFooter moimId={moimId} />
    </div>
  );
};

export default OngoingGathering;
