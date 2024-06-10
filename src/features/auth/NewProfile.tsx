import React from 'react';
import { NewProfileProps } from './types/index';
import classnames from 'classnames/bind';
import styles from './newProfile.module.scss';
import BackNavigation from './components/BackNavigation';
import StepOne from './components/StepOne';
import NextStepLink from './components/NextStepLink';

const cn = classnames.bind(styles);

const NewProfile = (props: NewProfileProps) => {
  console.log(props);
  return (
    <div className={cn('new_profile')}>
      <div>
        <BackNavigation />
        <StepOne />
      </div>
      <div className={cn('wrap_next_step_link')}>
        <NextStepLink />
      </div>
    </div>
  );
};

export default NewProfile;
