import classnames from 'classnames/bind';
import styles from './scrollPhotoTop10List.module.scss';
import HorizontalScrollWrapper from '../../../../common/components/HorizontalScrollWrapper/HorizontalScrollWrapper';
import PhotoCard from './PhotoCard/PhotoCard';
import { Photo } from '../../types';
import { PhotoCardProps } from '../../types';

const cn = classnames.bind(styles);

interface Props {
  data: Photo[];
}

const ScrollPhotoTop10List = ({ data }: Props) => {
  return (
    <div className={cn('scroll_photo_top10_list')}>
      <HorizontalScrollWrapper>
        <ul className={cn('photo_list')}>
          {data.map((photo: Photo) => {
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
            console.log(photo);
            return (
              <li className={cn('item')} key={`photocard-${photo.photoId}`}>
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
