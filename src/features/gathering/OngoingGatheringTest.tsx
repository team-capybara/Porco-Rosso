import { useRef, useState } from 'react';
import classnames from 'classnames/bind';
import { OngoingGatheringProps, ongoingType } from './types/index';
import styles from './ongoingGathering.module.scss';
import OngoingFooter from './components/OngoingFooter/OngoingFooter';
import RenderOngoingMain from './components/RenderOngoingMain/RenderOngoingMain';
import RenderPhotoList from './components/RenderPhotoList/RenderPhotoList';
import RenderPhotoDetail from './components/RenderPhotoDetail/RenderPhotoDetail';
import html2canvas from 'html2canvas';

const cn = classnames.bind(styles);

// 진행 중 모임
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OngoingGatheringTest = (_props: OngoingGatheringProps) => {
  const captureRef = useRef<HTMLDivElement>(null);

  const handleCaptureClick = () => {
    if (captureRef.current === null) return;

    // html2canvas로 canvas 생성
    html2canvas(captureRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'capture.png';
      link.click();
    });
  };

  const [renderComponent, setRenderComponent] =
    useState<ongoingType>('OngoingMain');
  const [moimId] = useState<number>(1); //props로 변경될 수 있음

  return (
    <div className={cn('ongoing_gathering')} ref={captureRef}>
      {renderComponent === 'OngoingMain' && (
        <RenderOngoingMain
          moimId={moimId}
          setRenderComponent={setRenderComponent}
        />
      )}
      {renderComponent === 'PhotoList' && (
        <RenderPhotoList setRenderComponent={setRenderComponent} />
      )}
      {renderComponent === 'PhotoDetail' && (
        <RenderPhotoDetail setRenderComponent={setRenderComponent} />
      )}
      <OngoingFooter />
      <button style={{ backgroundColor: 'white' }} onClick={handleCaptureClick}>
        캡쳐
      </button>
    </div>
  );
};

export default OngoingGatheringTest;
