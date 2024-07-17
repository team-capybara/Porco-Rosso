import { memo } from 'react';
import classnames from 'classnames/bind';
import styles from './photoCard.module.scss';
import IconHeart15X15 from '../../../../../assets/svg/icon/IconHeart15X15';

const cn = classnames.bind(styles);

interface Props {
  photoId: number;
  photoUrl?: string;
  profileUrl?: string;
  likes?: number;
  liked?: boolean;
  likeButtonHandler?: (
    event: React.MouseEvent<HTMLButtonElement>,
    photoId: number
  ) => void;
}

const areEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.photoId === nextProps.photoId &&
    prevProps.likes === nextProps.likes &&
    prevProps.liked === nextProps.liked
  );
};
/* 
https://stackoverflow.com/questions/43817118/how-to-get-the-width-of-a-react-element
https://stackoverflow.com/questions/65721917/is-it-possible-to-observe-many-items-with-the-intersectionobserver*/

const PhotoCard = memo(
  ({
    photoId,
    photoUrl = '',
    profileUrl = '',
    likes = 0,
    liked = false,
    likeButtonHandler = (
      e: React.MouseEvent<HTMLButtonElement>,
      photoId: number
    ) => {
      e.preventDefault();
      console.log(photoId);
    },
  }: Props) => {
    // console.warn('rendered');
    return (
      <div className={cn('photo_card')}>
        <div className={cn('thumbnail')}>
          <img src={photoUrl} alt="/" className={cn('image')} />
        </div>
        {/* todo: 좋아요 된 경우, 'active' 클래스 활성화부탁드립니다. */}
        <button
          type="button"
          onClick={(e) => likeButtonHandler(e, photoId)}
          className={cn('like_button', { active: liked })}
        >
          <span className={cn('blind')}>좋아요</span>
          <IconHeart15X15 className={cn('icon')} />
          <span className={cn('number')}>{likes}</span>
        </button>
        <div className={cn('user_thumbnail')}>
          <img src={profileUrl} alt="/" className={cn('image')} />
        </div>
      </div>
    );
  },
  areEqual
);

PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;
