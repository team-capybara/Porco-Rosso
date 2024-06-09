import React from 'react';
import { NewProfileProps } from './types/index';
import classnames from 'classnames/bind';
import styles from './newProfile.module.scss';
import BackNavigation from './components/BackNavigation';
// import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import NextStepLink from './components/NextStepLink';
// import StepThree from './components/StepThree';

const cn = classnames.bind(styles);

const NewProfile = (props: NewProfileProps) => {
  console.log(props);
  return (
    <div className={cn('new_profile')}>
      <div>
        {/* todo: StepThree에서 BackNavigation 미노출 부탁드립니다. */}
        <BackNavigation />
        {/* todo: StepOne, StepTwo, StepThree 상황에 맞게 노출부탁드립니다. */}
        {/* <StepOne /> */}
        <StepTwo />
        {/* <StepThree /> */}
      </div>
      <div className={cn('wrap_next_step_link')}>
        <NextStepLink />
      </div>
    </div>
  );
};

export default NewProfile;
