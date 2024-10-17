import classnames from 'classnames/bind';
import styles from '../../ongoingGathering.module.scss';

import BackNavigation from '../../../auth/components/signup/BackNavigation';
import GatheringTitle from '../GatheringTitle/GatheringTitle';
import ScrollPhotoList from '../PhotoList/ScrollPhotoList';
import { ongoingType, PhotoCardProps } from '../../types';
import { useEffect, useState } from 'react';
import PhotoCard from '../PhotoList/PhotoCard/PhotoCard';
import { useMoimePhotoQuery } from '../../utils/useMoimePhotoQuery';
// import { useLocation, useNavigate } from 'react-router-dom';
const cn = classnames.bind(styles);

interface RenderPhotoDetailProps {
  moimId: string;
  setRenderComponent: React.Dispatch<React.SetStateAction<ongoingType>>;
}
// 진행 중 모임 사진 상세페이지
const RenderPhotoDetail = (props: RenderPhotoDetailProps) => {
  const { moimId, setRenderComponent } = props;

  const [selectedPhoto, setSelectedPhoto] = useState<PhotoCardProps>({
    moimId: moimId,
    photoId: -1,
  });

  // moimeId = '1'
  const { data } = useMoimePhotoQuery(moimId, null); // 초기 cursorId = null;

  useEffect(() => {
    // 쿼리스트링이 변경될 때마다 실행됨
    console.log('Query string changed:', location.search);

    const searchParams = new URLSearchParams(location.search);
    const selectedPhotoId = searchParams.get('selectedPhotoId');

    if (selectedPhotoId !== null && selectedPhotoId !== '-1') {
      if (data !== undefined) {
        data.pages.forEach((page) => {
          page.data.forEach((photo) => {
            if (photo.photoId === Number(selectedPhotoId)) {
              setSelectedPhoto({
                moimId: moimId,
                profileUrl: photo.uploaderProfile,
                photoUrl: photo.url,
                photoId: photo.photoId,
                likes: photo.likes,
                liked: photo.liked,
                likeButtonEnabled: true,
              });
            }
          });
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]); // location.search를 의존성으로 설정

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
        <PhotoCard {...selectedPhoto} key="selected-photo" />
      </div>
      <div className={cn('wrap_scroll_photo_list')}>
        <ScrollPhotoList
          moimeId={moimId}
          hiddenTitle={true}
          isMiniPhotoCard={true}
          selectedPhoto={selectedPhoto}
          isJustImg={true}
          setSelectedPhoto={setSelectedPhoto}
        />
      </div>
    </>
  );
};

export default RenderPhotoDetail;
