import { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './stepOne.module.scss';
import ProfileImage from './ProfileImage';
import NicknameInput from './NicknameInput';
import { NewProfileProps } from '../../types';
import { textInputValidation } from '../../../../common/utils/authUtils';
import NextStepButton from './NextStepButton';
import IconApple14X16 from '../../../../assets/svg/icon/IconApple14X16';

const cn = classnames.bind(styles);

const StepOne = ({
  userProfile,
  updateProfile,
  onSave,
  mode,
}: NewProfileProps) => {
  const [profile, setProfile] = useState<string>(userProfile.profile);
  const [newProfile, setNewProfile] = useState<File | null>(
    updateProfile.newProfile
  );
  const [nickname, setNickname] = useState<string>(userProfile.nickname);
  const [errMsg, setErrMsg] = useState<string>('');
  const [isProfileModify, setIsProfileModify] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const { providerType = '' } = userProfile;

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
      setIsFocus(true);
      return;
    }
    if (isProfileModify) {
      onSave({ newProfile, nickname });
    } else {
      const convertedFile = await urlToFile(
        profile,
        'profile-image.jpg',
        'image/jpeg'
      );
      onSave({ newProfile: convertedFile, nickname });
    }
  };

  return (
    <div
      className={cn({
        step_one: mode === 'signup',
        revise_profile: mode === 'mypage',
      })}
    >
      {mode === 'signup' ? (
        <h2 className={cn('title')}>
          나를 표현할
          <br />
          프로필을 완성하세요
        </h2>
      ) : (
        <div className={cn('title_area')}>
          <strong className={cn('title')}>프로필 수정</strong>
          <button
            type="button"
            className={cn('clear_button')}
            onClick={handleSave}
          >
            완료
          </button>
        </div>
      )}
      <div className={cn('wrap_profile_image')}>
        <ProfileImage
          value={profile}
          onChange={handleProfileChange}
          setProfile={setProfile}
          setIsProfileModify={setIsProfileModify}
        />
      </div>
      {mode === 'mypage' && (
        <>
          {providerType === 'APPLE' && (
            <div className={cn('wrap_login')}>
              <a href="/" className={cn('apple_login')}>
                <IconApple14X16 className={cn('icon')} />
                애플 간편 로그인
              </a>
            </div>
          )}
          {/* 카카오 로그인 마크업 추가 필요 */}
          {/* to markup */}
          {providerType === 'KAKAO' && (
            <div className={cn('wrap_login')}>
              <a href="/" className={cn('kakao_login')}>
                카카오 간편 로그인
              </a>
            </div>
          )}
        </>
      )}
      <div className={cn('wrap_nickname_input')}>
        <NicknameInput
          value={nickname}
          onChange={handleNicknameChange}
          errMsg={errMsg}
          isFocus={isFocus}
        />
      </div>
      {/* 버튼은 '다음' 1가지로 유지하되,
      정보를 입력하지 않으면 랜덤 프로필이미지/닉네임
      정보를 입력하면 조건 검증 후 회원가입 완료 */}
      {mode === 'signup' && <NextStepButton text="다음" onClick={handleSave} />}
    </div>
  );
};

export default StepOne;
