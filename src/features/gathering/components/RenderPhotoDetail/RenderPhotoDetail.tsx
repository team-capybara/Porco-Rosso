import classnames from 'classnames/bind';
import styles from '../../ongoingGathering.module.scss';

import BackNavigation from '../../../auth/components/signup/BackNavigation';
import GatheringTitle from '../GatheringTitle/GatheringTitle';
import PhotoCard from '../PhotoList/PhotoCard/PhotoCard';
import ScrollPhotoList from '../PhotoList/ScrollPhotoList';
import { ongoingType } from '../../types';
const cn = classnames.bind(styles);

interface RenderPhotoDetailProps {
  setRenderComponent: React.Dispatch<React.SetStateAction<ongoingType>>;
}
// 진행 중 모임 사진 상세페이지
const RenderPhotoDetail = (props: RenderPhotoDetailProps) => {
  const { setRenderComponent } = props;

  return (
    <>
      <BackNavigation
        classNameForIconType="arrow_type"
        blindText="이전으로"
        isButton={true}
        onClick={(e) => {
          e.preventDefault();
          setRenderComponent('PhotoList');
        }}
      />
      <div className={cn('wrap_gathering_title')}>
        <GatheringTitle
          title="모이미 제목인데요오오오ㅗ오 ㅇ ㄹㄴㅇㄴㄹ ㄴㅇ ㄹㅇㄴ ㄹㅇㄴ"
          description="2024년 5월 3일"
          hasShareButton={true}
        />
      </div>
      <div className={cn('wrap_photo_card')}>
        <PhotoCard photoId={1} />
      </div>
      <div className={cn('wrap_scroll_photo_list')}>
        <ScrollPhotoList
          moimeId={'1'}
          hiddenTitle={true}
          isMiniPhotoCard={true}
        />
      </div>
    </>
  );
};

export default RenderPhotoDetail;
