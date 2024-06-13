import React from 'react';
import classnames from 'classnames/bind';
import styles from './stepOne.module.scss';
import ProfileImage from './ProfileImage';
import NicknameInput from './NicknameInput';

const cn = classnames.bind(styles);

const StepOne = () => {
  return (
    <div className={cn('step_one')}>
      <h2 className={cn('title')}>
        나를 표현할
        <br />
        프로필을 완성하세요
      </h2>
      <div className={cn('wrap_profile_image')}>
        <ProfileImage />
      </div>
      <div className={cn('wrap_nickname_input')}>
        <NicknameInput />
      </div>
    </div>
  );
};

export default StepOne;
