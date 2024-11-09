import { memo, useRef, useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import styles from './photoCard.module.scss';
import IconHeart15X15 from '../../../../../assets/svg/icon/IconHeart15X15';
import { PhotoCardProps } from '../../../types';
import { updatePhotoLike } from '../../../../../api/service/photoApi';

const cn = classnames.bind(styles);

const areEqual = (prevProps: PhotoCardProps, nextProps: PhotoCardProps) => {
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
    moimId,
    photoId,
    photoUrl = '',
    profileUrl = '',
    likes = 0,
    liked = false,
    likeButtonEnabled = true, // 기본값은 true로 설정
    onClickHandler,
    isJustImg = false,
    pageNum,
    photoLikeUpdateHandler = () => {},
  }: PhotoCardProps) => {
    const [isLiked, setLiked] = useState(liked);
    const [likeCount, setLikeCount] = useState(likes);
    const likeLoading = useRef<boolean>(false); // 요청 상태 관리

    const toggleLike = async () => {
      if (!likeButtonEnabled || likeLoading.current || moimId === undefined)
        return; // 이미 요청 중이면 중복 방지

      likeLoading.current = true;
      try {
        await updatePhotoLike(moimId, photoId, isLiked);
        if (pageNum !== undefined) {
          photoLikeUpdateHandler(photoId, !isLiked, pageNum);
        }
        setLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      } catch (error) {
        console.error('좋아요 상태 변경 실패:', error);
      } finally {
        likeLoading.current = false;
      }
    };

    useEffect(() => {
      setLiked(liked);
      setLikeCount(likes);
    }, [likes, liked]);

    return (
      <div className={cn('photo_card')}>
        <div
          className={cn('thumbnail')}
          onClick={() => {
            if (onClickHandler === undefined) return;
            onClickHandler(String(photoId));
          }}
          aria-hidden="true"
        >
          <img src={photoUrl} alt="/" className={cn('image')} />
        </div>
        {/* todo: 좋아요 된 경우, 'active' 클래스 활성화부탁드립니다. */}
        {!isJustImg && (
          <button
            type="button"
            onClick={toggleLike}
            className={cn('like_button', { active: isLiked })}
            disabled={!likeButtonEnabled}
          >
            <span className={cn('blind')}>좋아요</span>
            <IconHeart15X15 className={cn('icon')} />
            <span className={cn('number')}>{likeCount}</span>
          </button>
        )}
        {!isJustImg && (
          <div className={cn('user_thumbnail')}>
            <img src={profileUrl} alt="/" className={cn('image')} />
          </div>
        )}
      </div>
    );
  },
  areEqual
);

PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;
