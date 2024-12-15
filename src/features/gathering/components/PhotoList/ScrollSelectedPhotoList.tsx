import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './scrollPhotoList.module.scss';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';
import HorizontalScrollWrapper from '../../../../common/components/HorizontalScrollWrapper/HorizontalScrollWrapper';
import PhotoCard from './PhotoCard/PhotoCard';
import { Photo } from '../../types';
import { PhotoCardProps } from '../../types';
import React from 'react';
import { getSelectedPhotos } from '../../../../api/service/gatheringApi';

const cn = classnames.bind(styles);

interface Props {
  moimeId: string;
  arrowButtonClickHandler?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const ScrollSelectedPhotoList = ({
  moimeId = '0',
  arrowButtonClickHandler,
}: Props) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo[]>([]);

  const setSelectedPhotoDataFunc = async () => {
    const response: Photo[] = await getSelectedPhotos(Number(moimeId));
    setSelectedPhoto(response);
  };

  useEffect(() => {
    setSelectedPhotoDataFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn('scroll_photo_list')}>
      <div className={cn('title_area')}>
        <div className={cn('main_title')}>
          <button
            type="button"
            className={cn('title')}
            onClick={(e) => {
              if (arrowButtonClickHandler === undefined) return;
              arrowButtonClickHandler(e);
            }}
          >
            순간 모음
          </button>
          <button
            type="button"
            className={cn('button')}
            onClick={(e) => {
              if (arrowButtonClickHandler === undefined) return;
              arrowButtonClickHandler(e);
            }}
          >
            <ArrowLeft24X24 className={cn('arrow_icon')} />
            <span className={cn('blind')}>더보기</span>
          </button>
        </div>
        <div
          className={cn('description')}
        >{`${selectedPhoto.length}장의 사진`}</div>
      </div>

      <HorizontalScrollWrapper>
        <ul className={cn('photo_list')}>
          {selectedPhoto.map((photo: Photo, index) => {
            const photoCardProps: PhotoCardProps = {
              profileUrl: photo.uploaderProfile,
              photoUrl: photo.url,
              photoId: photo.photoId,
              likes: photo.likes,
              liked: photo.liked,
              likeButtonEnabled: false,
              onClickHandler: undefined,
              isJustImg: false,
            };
            return (
              <li
                className={cn('item')}
                key={`photocard-${photo.photoId}`}
                data-index={index.toString()}
              >
                <PhotoCard {...photoCardProps} />
              </li>
            );
          })}
        </ul>
      </HorizontalScrollWrapper>
    </div>
  );
};

export default ScrollSelectedPhotoList;
