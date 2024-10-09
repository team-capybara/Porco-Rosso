import classnames from 'classnames/bind';
import styles from '../../ongoingGathering.module.scss';

import BackNavigation from '../../../auth/components/signup/BackNavigation';
import GatheringTitle from '../GatheringTitle/GatheringTitle';
import SelectedPhotoCard from '../PhotoList/SelectedPhotoCard/SelectedPhotoCard';
import ScrollPhotoList from '../PhotoList/ScrollPhotoList';
import { ongoingType, PhotoCardProps } from '../../types';
import { useEffect, useRef, useState } from 'react';
import { useMoimePhotoQuery } from '../../../../api/service/mockApi';
// import { useLocation, useNavigate } from 'react-router-dom';
const cn = classnames.bind(styles);

interface RenderPhotoDetailProps {
  setRenderComponent: React.Dispatch<React.SetStateAction<ongoingType>>;
}
// 진행 중 모임 사진 상세페이지
const RenderPhotoDetail = (props: RenderPhotoDetailProps) => {
  const { setRenderComponent } = props;
  const likeLoading = useRef<boolean>(false); // 요청 상태 관리

  const [selectedPhoto, setSelectedPhoto] = useState<PhotoCardProps>({
    photoId: -1,
  });

  // moimeId = '1'
  const { data } = useMoimePhotoQuery('1', null); // 초기 cursorId = null;

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

  const likeButtonHandler = async () => {
    console.warn('hihihihihihihihihihihihihihih,');
    if (likeLoading.current) return; // 이미 요청 중이면 중복 방지

    likeLoading.current = true;
    try {
      setSelectedPhoto!((prev: PhotoCardProps) => ({
        ...prev,
        liked: !prev.liked,
        likes: prev.liked ? prev.likes! - 1 : prev.likes! + 1,
      }));
    } catch (error) {
      console.error('좋아요 상태 변경 실패:', error);
    } finally {
      likeLoading.current = false;
    }
  };

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
        <SelectedPhotoCard
          {...selectedPhoto}
          likeButtonHandler={likeButtonHandler}
          key="selected-photo"
        />
      </div>
      <div className={cn('wrap_scroll_photo_list')}>
        <ScrollPhotoList
          moimeId={'1'}
          hiddenTitle={true}
          isMiniPhotoCard={true}
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
        />
      </div>
    </>
  );
};

export default RenderPhotoDetail;
