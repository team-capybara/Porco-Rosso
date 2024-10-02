import { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './stepOne.module.scss';
import ProfileImage from './ProfileImage';
import NicknameInput from './NicknameInput';
import { NewProfileProps } from '../../types';
import { textInputValidation } from '../../../../common/utils/authUtils';

const cn = classnames.bind(styles);

const StepOne = ({ userProfile, updateProfile, onSave }: NewProfileProps) => {
  const [profile, setProfile] = useState<string>(userProfile.profile);
  const [newProfile, setNewProfile] = useState<File | null>(
    updateProfile.newProfile
  );
  const [nickname, setNickname] = useState<string>(userProfile.nickname);
  const [errMsg, setErrMsg] = useState<string>('');
  const [isProfileModify, setIsProfileModify] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleProfileChange = (file: File) => {
    setNewProfile(file);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocus(false);
    const nameInput = event.target.value;
    setNickname(nameInput);
    const errorMsg = textInputValidation(nameInput, 'withoutEmoji');
    setErrMsg(errorMsg);
  };

  // URL을 파일로 변환하는 함수
  const urlToFile = async (url: string, filename: string, mimeType: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  };

  const handleSave = async () => {
    // 닉네임 밸리데이션 미통과
    if (errMsg) {
      console.log('ㅎㅎ');
      console.log(isFocus, 'isFoucs');
      setIsFocus(true);
      return;
    }
    if (isProfileModify) {
      console.log('프로필 사진 바뀌었음');
      onSave({ newProfile, nickname });
    } else {
      console.log('프로필 사진 안바뀌었음');
      const convertedFile = await urlToFile(
        profile,
        'profile-image.jpg',
        'image/jpeg'
      );
      onSave({ newProfile: convertedFile, nickname });
    }
  };

  return (
    <div className={cn('step_one')}>
      <h2 className={cn('title')}>
        나를 표현할
        <br />
        프로필을 완성하세요
      </h2>
      <div className={cn('wrap_profile_image')}>
        <ProfileImage
          value={profile}
          onChange={handleProfileChange}
          setProfile={setProfile}
          setIsProfileModify={setIsProfileModify}
        />
      </div>
      <div className={cn('wrap_nickname_input')}>
        <NicknameInput
          value={nickname}
          onChange={handleNicknameChange}
          errMsg={errMsg}
          isFocus={isFocus}
        />
      </div>
      <div className={cn('wrap_next_step_link')}>
        {/* 버튼은 '다음' 1가지로 유지하되,
        정보를 입력하지 않으면 랜덤 프로필이미지/닉네임
        정보를 입력하면 조건 검증 후 회원가입 완료 */}
        {/* <NextStepLink text="건너뛰기" /> */}
        {/* to markup : 가입 단계가 많이 생략되어서, 링크이동이 아니라 버튼으로 바뀔 것 같습니다. 마크업 부탁드립니다. */}
        <button
          onClick={handleSave}
          style={{ color: '#fff', fontSize: '18px' }} // test 용 인라인이라 제거하셔도 됩니다
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default StepOne;
