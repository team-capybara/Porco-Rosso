import classnames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import styles from './scrollPhotoList.module.scss';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';
import HorizontalScrollWrapper from '../../../../common/components/HorizontalScrollWrapper/HorizontalScrollWrapper';
import PhotoCard from './PhotoCard/PhotoCard';
import { ongoingType, Photo } from '../../types';
import { PhotoCardProps } from '../../types';
import { useMoimePhotoQuery } from '../../../../api/service/mockApi';
import { getMoimePhotoResponse } from '../../types';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const cn = classnames.bind(styles);

interface Props {
  hiddenTitle?: boolean;
  isMiniPhotoCard?: boolean;
  moimeId: string;
  setRenderComponent?: React.Dispatch<React.SetStateAction<ongoingType>>;
  selectedPhoto?: PhotoCardProps;
  setSelectedPhoto?: React.Dispatch<React.SetStateAction<PhotoCardProps>>;
}

const ScrollPhotoList = ({
  hiddenTitle = false,
  isMiniPhotoCard = false,
  moimeId = '0',
  setRenderComponent,
  selectedPhoto,
}: Props) => {
  const navigate = useNavigate();
  const targetRef = useRef<HTMLLIElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { data, fetchNextPage, isFetchingNextPage, totalPhotos } =
    useMoimePhotoQuery(moimeId, null); // 초기 cursorId = null;

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return;
      if (isFetchingNextPage) return;
      fetchNextPage();
    });
  };

  useEffect(() => {
    const targetElement = targetRef.current;

    if (!targetElement) return;

    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.3, // 10% 정도 화면에 보이면 트리거
    });

    observerRef.current.observe(targetElement);

    return () => {
      if (observerRef.current && targetElement) {
        observerRef.current.unobserve(targetElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setSelectedPhotoId = (selectedPhotoId: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('selectedPhotoId', selectedPhotoId);
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <div
      className={cn('scroll_photo_list', {
        is_mini_photo_card: isMiniPhotoCard,
      })}
    >
      {!hiddenTitle && (
        <div className={cn('title_area')}>
          <div className={cn('main_title')}>
            <strong className={cn('title')}>순간 모음</strong>
            <button
              type="button"
              className={cn('button')}
              onClick={() => {
                if (setRenderComponent === undefined) return;
                setRenderComponent!('PhotoList');
              }}
            >
              <ArrowLeft24X24 className={cn('arrow_icon')} />
              <span className={cn('blind')}>더보기</span>
            </button>
          </div>
          <div className={cn('description')}>{`${totalPhotos}장의 사진`}</div>
        </div>
      )}
      <HorizontalScrollWrapper>
        <ul className={cn('photo_list')}>
          {data?.pages.map((page: getMoimePhotoResponse, pageNum: number) => (
            <React.Fragment key={`page-${pageNum}`}>
              {page.data.map((photo: Photo) => {
                const photoCardProps: PhotoCardProps = {
                  profileUrl: photo.uploaderProfile,
                  photoUrl: photo.url,
                  photoId: photo.photoId,
                  likes:
                    photo.photoId === selectedPhoto?.photoId
                      ? selectedPhoto.likes
                      : photo.likes,
                  liked:
                    photo.photoId === selectedPhoto?.photoId
                      ? selectedPhoto.liked
                      : photo.liked,
                  likeButtonEnabled: false,
                  onClickHandler: setSelectedPhotoId,
                  isJustImg: true,
                };

                return (
                  <li className={cn('item')} key={`photocard-${photo.photoId}`}>
                    <PhotoCard {...photoCardProps} />
                  </li>
                );
              })}
            </React.Fragment>
          ))}
          {isMiniPhotoCard ? (
            <li
              className={cn('item')}
              style={{
                backgroundColor: 'black',
                width: '86px',
                height: '86px',
              }}
              ref={targetRef}
            ></li>
          ) : (
            <li
              className={cn('item')}
              style={{
                backgroundColor: 'black',
                width: '220px',
                height: '220px',
              }}
              ref={targetRef}
            ></li>
          )}
        </ul>
      </HorizontalScrollWrapper>
    </div>
  );
};

export default ScrollPhotoList;
