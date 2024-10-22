import classnames from 'classnames/bind';
import styles from '../../../endedGathering.module.scss';

import BackNavigation from '../../../../auth/components/signup/BackNavigation';
import GatheringTitle from '../../GatheringTitle/GatheringTitle';
import PhotoList from '../PhotoList';
import { onPopBridge } from '../../../../../bridge/gatheringBridge';

const cn = classnames.bind(styles);

interface RenderPhotoListProps {
  moimId: string;
}

// 진행 종료 모임 사진 모음
const RenderEndedGathering = (props: RenderPhotoListProps) => {
  const { moimId } = props;

  const NavigationClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onPopBridge();
  };

  return (
    <>
      <BackNavigation
        classNameForIconType="close_type"
        blindText="메인화면으로"
        isButton={true}
        onClick={NavigationClickHandler}
      />
      <div className={cn('wrap_gathering_title')}>
        <GatheringTitle
          title="모임이 종료되었어요"
          description={
            '좋아요를 많이 받은 10개의 사진만 모음이 끝나도 볼 수 있어요'
          }
        />
      </div>
      <div className={cn('wrap_photo_list')}>
        <PhotoList moimeId={moimId} />
      </div>
    </>
  );
};

export default RenderEndedGathering;
