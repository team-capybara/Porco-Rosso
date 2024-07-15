import { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import styles from './stepOne.module.scss';
import ProfileImage from './ProfileImage';
import NicknameInput from './NicknameInput';
import NextStepLink from './NextStepLink';
import { NewProfileProps } from '../../types';

const cn = classnames.bind(styles);

const StepOne = ({ userProfile, onSave }: NewProfileProps) => {
  const [profile, setProfile] = useState<File | string>(userProfile.profile);
  const [nickname, setNickname] = useState<string>(userProfile.nickname);

  useEffect(() => {
    setProfile(userProfile.profile);
    setNickname(userProfile.nickname);
  }, [userProfile]);

  const handleProfileChange = (file: File) => {
    setProfile(file);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleSave = () => {
    onSave({ profile, nickname });
  };

  return (
    <div className={cn('step_one')}>
      <h2 className={cn('title')}>
        나를 표현할
        <br />
        프로필을 완성하세요
      </h2>
      <div className={cn('wrap_profile_image')}>
        <ProfileImage onChange={handleProfileChange} />
      </div>
      <div className={cn('wrap_nickname_input')}>
        <NicknameInput value={nickname} onChange={handleNicknameChange} />
      </div>
      <div className={cn('wrap_next_step_link')}>
        {/* todo: StepOne에서는 건너뛰기, StepTwo에서는 다음 text Props 부탁드립니다. */}
        <NextStepLink text="건너뛰기" />
      </div>
      <button onClick={handleSave}>변경하기</button>
    </div>
  );
};

export default StepOne;
