import classnames from 'classnames/bind';
import styles from './profileImage.module.scss';
import IconEdit16X16 from '../../../../assets/svg/icon/IconEdit16X16';
import { ProfileImageProps } from '../../types';

const cn = classnames.bind(styles);

const ProfileImage = ({
  value,
  onChange,
  setProfile,
  setIsProfileModify,
}: ProfileImageProps) => {
  const base64ToBlob = (base64Data: string, contentType: string): Blob => {
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
  };

  const editProfile = () => {
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
      <button type="button" className={cn('button')} onClick={editProfile}>
        <span className={cn('thumbnail')}>
          <img src={value} alt="" className={cn('image')} />
        </span>
        <span className={cn('icon_area')}>
          <IconEdit16X16 className={cn('icon')} />
        </span>
        <span className={cn('blind')}>프로필 이미지</span>
      </button>
    </div>
  );
};

export default ProfileImage;
