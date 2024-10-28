import classnames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import styles from './scrollPhotoList.module.scss';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';
import HorizontalScrollWrapper from '../../../../common/components/HorizontalScrollWrapper/HorizontalScrollWrapper';
import PhotoCard from './PhotoCard/PhotoCard';
import { Photo } from '../../types';
import { PhotoCardProps } from '../../types';
import { getMoimePhotoResponse } from '../../types';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useMoimePhotoQuery } from '../../utils/useMoimePhotoQuery';

const cn = classnames.bind(styles);

interface Props {
  hiddenTitle?: boolean;
  isMiniPhotoCard?: boolean;
  isLargePhotoCard?: boolean;
  moimeId: string;
  arrowButtonClickHandler?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  selectedPhoto?: PhotoCardProps;
  setSelectedPhoto?: React.Dispatch<React.SetStateAction<PhotoCardProps>>;
  isJustImg: boolean;
  isRefresh?: boolean;
}

const ScrollPhotoList = ({
  hiddenTitle = false,
  isMiniPhotoCard = false,
  isLargePhotoCard = false,
  moimeId = '0',
  arrowButtonClickHandler,
  selectedPhoto,
  isJustImg = false,
  isRefresh = false,
}: Props) => {
  const navigate = useNavigate();
  const targetRef = useRef<HTMLLIElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    totalPhotos,
    resetAndFetchFirstPage,
  } = useMoimePhotoQuery(moimeId, null); // 초기 cursorId = null;

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

  useEffect(() => {
    if (isRefresh) resetAndFetchFirstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefresh]); // 새로고침

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
        is_large_photo_card: isLargePhotoCard,
      })}
    >
      {!hiddenTitle && (
        <div className={cn('title_area')}>
          <div className={cn('main_title')}>
            <strong className={cn('title')}>순간 모음</strong>
            <button
              type="button"
              className={cn('button')}
              onClick={(e) => {
                if (arrowButtonClickHandler === undefined) return;
                arrowButtonClickHandler(e);
              }}
              // onClick={() => {
              //   if (setRenderComponent === undefined) return;
              //   setRenderComponent!('PhotoList');
              // }}
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
                  moimId: moimeId,
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
                  onClickHandler: isJustImg ? setSelectedPhotoId : undefined,
                  isJustImg: isJustImg,
                };
                return (
                  <li className={cn('item')} key={`photocard-${photo.photoId}`}>
                    <PhotoCard {...photoCardProps} />
                  </li>
                );
              })}
            </React.Fragment>
          ))}
          {/* 페이지네이션 기준점을 잡기 위한 요소 */}
          <li className={cn('item', 'base')} ref={targetRef} />
        </ul>
      </HorizontalScrollWrapper>
    </div>
  );
};

export default ScrollPhotoList;
