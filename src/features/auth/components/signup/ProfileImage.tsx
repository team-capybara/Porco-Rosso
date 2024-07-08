import classnames from 'classnames/bind';
import styles from './profileImage.module.scss';

const cn = classnames.bind(styles);

const ProfileImage = () => {
  return (
    <div className={cn('profile_image')}>
      <label htmlFor="profile_file" className={cn('label')}>
        <span className={cn('text')}>파일 찾기</span>
        <input type="file" id="profile_file" className={cn('blind')} />
      </label>
    </div>
  );
};

export default ProfileImage;
