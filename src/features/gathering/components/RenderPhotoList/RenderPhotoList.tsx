import classnames from 'classnames/bind';
import styles from '../../ongoingGathering.module.scss';

import BackNavigation from '../../../auth/components/signup/BackNavigation';
import GatheringTitle from '../GatheringTitle/GatheringTitle';
import PhotoList from '../PhotoList/PhotoList';
import { ongoingType } from '../../types';
import { useMoimePhotoQuery } from '../../utils/useMoimePhotoQuery';

const cn = classnames.bind(styles);

interface RenderPhotoListProps {
  moimId: string;
  setRenderComponent: React.Dispatch<React.SetStateAction<ongoingType>>;
}

// 진행 중 모임 순간 모음
const RenderPhotoList = (props: RenderPhotoListProps) => {
  const { setRenderComponent, moimId } = props;

  const { totalPhotos } = useMoimePhotoQuery(moimId, null);

  const PhotoListBackNavigationClickHandler = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setRenderComponent('OngoingMain');
  };
  return (
    <>
      <BackNavigation
        classNameForIconType="arrow_type"
        blindText="이전으로"
        isButton={true}
        onClick={PhotoListBackNavigationClickHandler}
      />
      <div className={cn('wrap_gathering_title')}>
        <GatheringTitle
          title="순간 모음"
          description={`${totalPhotos}장의 사진`}
        />
      </div>
      <div className={cn('wrap_photo_list')}>
        <PhotoList moimeId={moimId} />
      </div>
    </>
  );
};

export default RenderPhotoList;
