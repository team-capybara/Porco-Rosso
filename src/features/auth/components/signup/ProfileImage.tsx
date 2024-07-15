import classnames from 'classnames/bind';
import styles from './profileImage.module.scss';
import IconEdit16X16 from '../../../../assets/svg/icon/IconEdit16X16';

const cn = classnames.bind(styles);

const ProfileImage = () => {
  return (
    <div className={cn('profile_image')}>
      <div className={cn('inner')}>
        <label htmlFor="profile_file" className={cn('label')}>
          <span className={cn('icon_area')}>
            <IconEdit16X16 className={cn('icon')} />
          </span>
          <input
            type="file"
            accept="image/*"
            id="profile_file"
            aria-label="프로필 이미지"
            className={cn('blind')}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfileImage;
