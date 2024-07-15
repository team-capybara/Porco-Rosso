import { useEffect } from 'react';
import { NewProfileProps } from './types/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from '../../common/utils/authUtils';
import classnames from 'classnames/bind';
import styles from './newProfile.module.scss';
import StepOne from './components/signup/StepOne';
// import StepTwo from './components/signup/StepTwo';
// import StepThree from './components/signup/StepThree';
import NextStepLink from './components/signup/NextStepLink';

const cn = classnames.bind(styles);

const NewProfile = (props: NewProfileProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(props);
  useEffect(() => {
    const accessToken = getCookie('access_token');
    console.log(accessToken, '받아오나?');

    // 로그인 오류 처리
    if (!accessToken) {
      // 다시 로그인으로
      navigate('/', { state: { from: location } });
    } else {
      // 앱 메인으로 연결
    }
  }, [location, navigate]);

  return (
    <div className={cn('new_profile')}>
      <div>
        {/* todo: StepOne, StepTwo, StepThree 상황에 맞게 노출부탁드립니다. */}
        <StepOne />
        {/* <StepTwo /> */}
        {/* <StepThree /> */}
      </div>
      <div className={cn('wrap_next_step_link')}>
        {/* todo: StepOne에서는 건너뛰기, StepTwo에서는 다음 text Props 부탁드립니다. */}
        <NextStepLink text="건너뛰기" />
      </div>
    </div>
  );
};

export default NewProfile;
