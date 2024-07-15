import classnames from 'classnames/bind';
import styles from './profileImage.module.scss';
import IconEdit16X16 from '../../../../assets/svg/icon/IconEdit16X16';
import { ProfileImageProps } from '../../types';

const cn = classnames.bind(styles);

const ProfileImage = ({ onChange }: ProfileImageProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onChange(event.target.files[0]);
    }
  };
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
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfileImage;
