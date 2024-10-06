// import { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './profileImage.module.scss';
import IconEdit16X16 from '../../../../assets/svg/icon/IconEdit16X16';
import { ProfileImageProps } from '../../types';
import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

const cn = classnames.bind(styles);

const ProfileImage = ({
  value,
  onChange,
  setProfile,
  setIsProfileModify,
}: ProfileImageProps) => {
  //heif convert 배포해서 테스트
  const heifConvert = async (file: File) => {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
      });
      console.log(convertedBlob, 'convertedBLob');
      const blobItem = Array.isArray(convertedBlob)
        ? convertedBlob[0]
        : convertedBlob;
      console.log(blobItem, 'blobItem');
      const convertedFile = new File(
        [blobItem],
        file.name.split('.')[0] + '.jpg', // 파일 이름 설정
        { type: 'image/jpeg', lastModified: new Date().getTime() } // 파일 속성 설정
      );
      console.log(convertedFile, 'convertedFile');
      return convertedFile;
    } catch (error) {
      console.error('Error converting HEIF to JPEG:', error);
      return file;
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const validExtensions = [
        'image/jpeg',
        'image/png',
        'image/heic',
        'image/heif',
      ];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      console.log(file, 'file에서 확장자가 뭐로 뜨지');

      if (!validExtensions.includes(file.type)) {
        alert('허용된 확장자는 JPEG, PNG, HEIF입니다.');
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

      // 이미지 프로세싱
      // 1. HEIF 변환, 2. 이미지 압축
      // HEIF 변환
      let processedFile = file;
      if (file.type === 'image/heif' || file.type === 'image/heic') {
        processedFile = await heifConvert(file);
        if (
          processedFile.type === 'image/heif' ||
          processedFile.type === 'image/heif'
        ) {
          alert('HEIF/HEIF 확장자 변환 에러');
          return;
        }
      }

      // 이미지 압축
      const options = {
        maxSizeMB: 0.2, // 사진 용량 max 200kb 제한
        maxWidthOrHeight: 440, // resolution 440 * 440 제한
        useWebWorker: true,
      };

      const compressedBlob = await imageCompression(processedFile, options);

      // Blob을 File로 변환
      const blobToFile = new File([compressedBlob], processedFile.name, {
        type: compressedBlob.type,
      });

      console.log(blobToFile, 'blobtofile');

      onChange(blobToFile);
      setIsProfileModify(true);
    }
  };
  return (
    <div className={cn('profile_image')}>
      <button type="button" className={cn('button')}>
        <span className={cn('thumbnail')}>
          <img src={value} alt="" className={cn('image')} />
        </span>
        <span className={cn('icon_area')}>
          <IconEdit16X16 className={cn('icon')} />
        </span>
        <span className={cn('blind')}>프로필 이미지</span>
      </button>

      {/* todo: 개발 작업하면서 input 태그 제거 부탁드립니다. */}
      <input
        type="file"
        accept="image/*"
        id="profile_file"
        aria-label="프로필 이미지"
        className={cn('blind')}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfileImage;
