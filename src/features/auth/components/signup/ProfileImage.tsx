// import { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './profileImage.module.scss';
import IconEdit16X16 from '../../../../assets/svg/icon/IconEdit16X16';
import { ProfileImageProps } from '../../types';
// import imageCompression from 'browser-image-compression';
// import heic2any from 'heic2any';

const cn = classnames.bind(styles);

const ProfileImage = ({
  value,
  onChange,
  setProfile,
  setIsProfileModify,
}: ProfileImageProps) => {
  //heif convert 배포해서 테스트
  // const heifConvert = async (file: File) => {
  //   try {
  //     const convertedBlob = await heic2any({
  //       blob: file,
  //       toType: 'image/jpeg',
  //     });
  //     console.log(convertedBlob, 'convertedBLob');
  //     const blobItem = Array.isArray(convertedBlob)
  //       ? convertedBlob[0]
  //       : convertedBlob;
  //     console.log(blobItem, 'blobItem');
  //     const convertedFile = new File(
  //       [blobItem],
  //       file.name.split('.')[0] + '.jpg', // 파일 이름 설정
  //       { type: 'image/jpeg', lastModified: new Date().getTime() } // 파일 속성 설정
  //     );
  //     console.log(convertedFile, 'convertedFile');
  //     return convertedFile;
  //   } catch (error) {
  //     console.error('Error converting HEIF to JPEG:', error);
  //     return file;
  //   }
  // };

  // const handleFileChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     const validExtensions = [
  //       'image/jpeg',
  //       'image/png',
  //       'image/heic',
  //       'image/heif',
  //     ];
  //     const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  //     console.log(file, 'file에서 확장자가 뭐로 뜨지');

  //     if (!validExtensions.includes(file.type)) {
  //       alert('허용된 확장자는 JPEG, PNG, HEIF입니다.');
  //       return;
  //     }

  //     if (file.size > maxSizeInBytes) {
  //       alert('파일 크기는 5MB를 초과할 수 없습니다.');
  //       return;
  //     }

  //     // 파일 미리보기 업데이트
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if (reader.result) {
  //         setProfile(reader.result as string);
  //       }
  //     };
  //     reader.readAsDataURL(file);

  //     // 이미지 프로세싱
  //     // 1. HEIF 변환, 2. 이미지 압축
  //     // HEIF 변환
  //     let processedFile = file;
  //     if (file.type === 'image/heif' || file.type === 'image/heic') {
  //       processedFile = await heifConvert(file);
  //       if (
  //         processedFile.type === 'image/heif' ||
  //         processedFile.type === 'image/heif'
  //       ) {
  //         alert('HEIF/HEIF 확장자 변환 에러');
  //         return;
  //       }
  //     }

  //     // 이미지 압축
  //     const options = {
  //       maxSizeMB: 0.2, // 사진 용량 max 200kb 제한
  //       maxWidthOrHeight: 440, // resolution 440 * 440 제한
  //       useWebWorker: true,
  //     };

  //     const compressedBlob = await imageCompression(processedFile, options);

  //     // Blob을 File로 변환
  //     const blobToFile = new File([compressedBlob], processedFile.name, {
  //       type: compressedBlob.type,
  //     });

  //     console.log(blobToFile, 'blobtofile');

  //     onChange(blobToFile);
  //     setIsProfileModify(true);
  //   }
  // };

  function base64ToBlob(base64Data: string, contentType: string): Blob {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    const sliceSize = 512;

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  const editProfile = () => {
    console.log('클릭되었슈');
    window.kmpJsBridge.callNative('onPickImage', '', function (data: string) {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData && parsedData.image) {
          const base64Image = `data:image/jpeg;base64,${parsedData.image}`;
          setProfile(base64Image);
          setIsProfileModify(true);
          const base64Data = parsedData.image; // 'data:image/jpeg;base64,' 부분을 제외한 순수 base64 데이터
          const contentType = 'image/jpeg'; // 이미지의 MIME 타입

          // base64 문자열을 Blob으로 변환하는 함수 호출
          const blob = base64ToBlob(base64Data, contentType);

          // Blob을 File 객체로 변환
          const fileName = 'profile.jpg'; // 원하는 파일 이름 설정
          const file = new File([blob], fileName, { type: contentType });

          // onChange 함수 호출하여 파일 전달
          onChange(file);
        }
      } catch (error) {
        console.error('앱 브릿징 사진 데이터 파싱 과정 에러', error);
      }
    });
  };

  return (
    <div className={cn('profile_image')}>
      <div className={cn('inner')}>
        {/* to markup : 연필 버튼이 너무 작아서, 전체 영역 클릭 시 사진 수정 브릿징 기능이 on 되도록 하자는 요청이 있었습니다. */}
        {/* 버튼으로 감쌌는데, 문제 없을지 문의드려요 */}
        <button onClick={editProfile}>
          <div className={cn('thumbnail')}>
            <img src={value} alt="" className={cn('image')} />
          </div>
          <label htmlFor="profile_file" className={cn('label')}>
            <span className={cn('icon_area')}>
              <IconEdit16X16 className={cn('icon')} />
            </span>
            {/* to markup : 사진 선택 자체가 브릿징으로 네이티브로 넘어가면서, 인풋 태그는 무의미해진 거 같습니다, 삭제해도 문제 없을지 문의드려요 */}
            {/* <input
              type="file"
              accept="image/*"
              id="profile_file"
              aria-label="프로필 이미지"
              className={cn('blind')}
              onChange={handleFileChange}
            /> */}
          </label>
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
