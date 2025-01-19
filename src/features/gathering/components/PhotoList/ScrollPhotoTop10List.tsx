import classnames from 'classnames/bind';
import styles from './scrollPhotoTop10List.module.scss';
import HorizontalScrollWrapper from '../../../../common/components/HorizontalScrollWrapper/HorizontalScrollWrapper';
import PhotoCard from './PhotoCard/PhotoCard';
import { Photo } from '../../types';
import { PhotoCardProps } from '../../types';
import { useEffect, useRef } from 'react';

const cn = classnames.bind(styles);

interface Props {
  data: Photo[];
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ScrollPhotoTop10List = ({ data, setCurrentIndex }: Props) => {
  const containerRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(
            entry.target.getAttribute('data-index') || '0'
          );
          setCurrentIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const items = containerRef.current.querySelectorAll('[data-index]');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [setCurrentIndex, data]);

  return (
    <div className={cn('scroll_photo_top10_list')}>
      <HorizontalScrollWrapper>
        <ul className={cn('photo_list')} ref={containerRef}>
          {data.map((photo: Photo, index) => {
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

export default ScrollPhotoTop10List;
