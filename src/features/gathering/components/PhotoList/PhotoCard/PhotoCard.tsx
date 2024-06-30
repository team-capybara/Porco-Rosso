import React from 'react';
import classnames from 'classnames/bind';
import styles from './photoCard.module.scss';
import IconHeart15X15 from '../../../../../assets/svg/icon/IconHeart15X15';
import { PhotoCardProps } from '../PhotoList';

const cn = classnames.bind(styles);

const PhotoCard = (props: { props: PhotoCardProps }) => {
  const { photoUrl, profileUrl } = props.props;
  console.warn('photoUrl', photoUrl);
  return (
    <div className={cn('photo_card')}>
      <div className={cn('thumbnail')}>
        <img src={photoUrl} alt="/" className={cn('image')} />
      </div>
      {/* todo: 좋아요 된 경우, 'active' 클래스 활성화부탁드립니다. */}
      <button type="button" className={cn('like_button', { active: false })}>
        <span className={cn('blind')}>좋아요</span>
        <IconHeart15X15 className={cn('icon')} />
        <span className={cn('number')}>5</span>
      </button>
      <div className={cn('user_thumbnail')}>
        <img src={profileUrl} alt="/" className={cn('image')} />
      </div>
    </div>
  );
};

export default PhotoCard;
