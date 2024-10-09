import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './selectedPhotoCard.module.scss';
import IconHeart15X15 from '../../../../../assets/svg/icon/IconHeart15X15';
import { SelectedPhotoCardProps } from '../../../types';

const cn = classnames.bind(styles);

const SelectedPhotoCard = ({
  photoId = -1,
  photoUrl = '',
  profileUrl = '',
  likes = 0,
  liked = false,
  likeButtonEnabled = true, // 기본값은 true로 설정,
  likeButtonHandler,
}: SelectedPhotoCardProps) => {
  console.warn('check,', liked, likes);
  const [isLiked, setLiked] = useState<boolean>(liked);
  const [likeCount, setLikeCount] = useState<number>(likes);

  useEffect(() => {
    setLiked(liked);
    setLikeCount(likes);
  }, [photoId, likes, liked]);

  return (
    <div className={cn('selected-photo_card')}>
      <div className={cn('thumbnail')} aria-hidden="true">
        <img src={photoUrl} alt="/" className={cn('image')} />
      </div>
      {/* todo: 좋아요 된 경우, 'active' 클래스 활성화부탁드립니다. */}
      <button
        type="button"
        onClick={likeButtonHandler}
        className={cn('like_button', { active: isLiked })}
        disabled={!likeButtonEnabled}
      >
        <span className={cn('blind')}>좋아요</span>
        <IconHeart15X15 className={cn('icon')} />
        <span className={cn('number')}>{likeCount}</span>
      </button>
      <div className={cn('user_thumbnail')}>
        <img src={profileUrl} alt="/" className={cn('image')} />
      </div>
    </div>
  );
};

SelectedPhotoCard.displayName = 'SelectedPhotoCard';

export default SelectedPhotoCard;
