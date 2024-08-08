import { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './stepOne.module.scss';
import ProfileImage from './ProfileImage';
import NicknameInput from './NicknameInput';
import { NewProfileProps } from '../../types';

const cn = classnames.bind(styles);

const StepOne = ({ userProfile, updateProfile, onSave }: NewProfileProps) => {
  const [profile, setProfile] = useState<string>(userProfile.profile);
  const [newProfile, setNewProfile] = useState<File | null>(
    updateProfile.newProfile
  );
  const [nickname, setNickname] = useState<string>(userProfile.nickname);

  const handleProfileChange = (file: File) => {
    setNewProfile(file);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleSave = () => {
    onSave({ newProfile, nickname });
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
        />
      </div>
      <div className={cn('wrap_nickname_input')}>
        <NicknameInput value={nickname} onChange={handleNicknameChange} />
      </div>
      <div className={cn('wrap_next_step_link')}>
        {/* 버튼은 '다음' 1가지로 유지하되,
        정보를 입력하지 않으면 랜덤 프로필이미지/닉네임
        정보를 입력하면 조건 검증 후 회원가입 완료 */}
        {/* todo: StepOne에서는 건너뛰기, StepTwo에서는 다음 text Props 부탁드립니다. */}
        {/* <NextStepLink text="건너뛰기" /> */}
        {/* 가입 단계가 많이 생략되어서, 링크이동이 아니라 버튼으로 바뀔 것 같습니다. 마크업 부탁드립니다. */}
        {/* 인라인 스타일태그는 글자가 너무 안보여섴 잠깐 썼어용 */}
        <button
          onClick={handleSave}
          style={{ color: '#fff', fontSize: '18px' }}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default StepOne;
