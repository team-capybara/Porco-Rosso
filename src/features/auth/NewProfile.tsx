import { useEffect } from 'react';
import { NewProfileProps } from './types/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from '../../common/utils/authUtils';
import classnames from 'classnames/bind';
import styles from './newProfile.module.scss';
import BackNavigation from './components/signup/BackNavigation';
// import StepOne from './components/StepOne';
import StepTwo from './components/signup/StepTwo';
import NextStepLink from './components/signup/NextStepLink';
// import StepThree from './components/StepThree';
// import { getUserInfo, testApi } from '../../api/service/authApi';
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query';

const cn = classnames.bind(styles);

const NewProfile = (props: NewProfileProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(props);

  // const {
  //   isLoading,
  //   isFetching,
  //   data: userData,
  //   isError,
  //   error,
  //   refetch,
  // } = useQuery({
  //   queryKey: ['userInfo'],
  //   queryFn: getUserInfo,
  // });

  // console.log(userData, 'userData에요요요용');

  // const { data: photoData } = useQuery({
  //   queryKey: ['photoInfo'],
  //   queryFn: testApi,
  // });

  // const testData = testApi();
  // console.log(testData, '대체왜...');

  // console.log(photoData, 'phtoData에요오오오오');
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
        {/* todo: StepThree에서 BackNavigation 미노출 부탁드립니다. */}
        <BackNavigation
          classNameForIconType="arrow_type"
          blindText="이전 페이지"
        />
        {/* todo: StepOne, StepTwo, StepThree 상황에 맞게 노출부탁드립니다. */}
        {/* <StepOne /> */}
        <StepTwo />
        {/* <StepThree /> */}ㅅ
      </div>
      <div className={cn('wrap_next_step_link')}>
        <NextStepLink />
      </div>
    </div>
  );
};

export default NewProfile;
