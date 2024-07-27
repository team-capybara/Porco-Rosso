// import { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './profileImage.module.scss';
import IconEdit16X16 from '../../../../assets/svg/icon/IconEdit16X16';
import { ProfileImageProps } from '../../types';

const cn = classnames.bind(styles);

const ProfileImage = ({ value, onChange, setProfile }: ProfileImageProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const validExtensions = ['image/jpeg', 'image/png'];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

      if (!validExtensions.includes(file.type)) {
        alert('허용된 확장자는 JPEG, PNG입니다.');
        return;
      }

      if (file.size > maxSizeInBytes) {
        alert('파일 크기는 5MB를 초과할 수 없습니다.');
        return;
      }

      // 파일 미리보기 업데이트
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setProfile(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      onChange(event.target.files[0]);
    }
  };
  return (
    <div className={cn('profile_image')}>
      <div className={cn('inner')}>
        {/* 이미지 태그에 프로필 사진이 들어가야 합니다. 마크업 부탁드립니다 */}
        <img src={value} alt="" style={{ width: '20px', height: '20px' }} />
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
