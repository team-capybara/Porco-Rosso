import { useEffect } from 'react';
import { UpdateProfile } from './types/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from '../../common/utils/authUtils';
import classnames from 'classnames/bind';
import styles from './newProfile.module.scss';
import StepOne from './components/signup/StepOne';
// import StepTwo from './components/signup/StepTwo';
// import StepThree from './components/signup/StepThree';
// import StepThree from './components/StepThree';
import { getUserInfo, updateProfile } from '../../api/service/authApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserProfile } from './types/index';

const cn = classnames.bind(styles);

const NewProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    // isLoading,
    // isFetching,
    data: userData,
    // isError,
    // error,
    // refetch,
  } = useQuery<UserProfile>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });

  console.log(userData, 'userData에요요요용');

  const handleSave = (updatedProfile: UpdateProfile) => {
    mutation.mutate(updatedProfile);
  };

  useEffect(() => {
    const accessToken = getCookie('access_token');
    console.log(accessToken, '받아오나?');

    // 로그인 오류 처리
    // if (!accessToken) {
    //   // 다시 로그인으로
    //   navigate('/', { state: { from: location } });
    // } else {
    //   // 앱 메인으로 연결
    // }
  }, [location, navigate]);

  return (
    <div className={cn('new_profile')}>
      <div>
        {/* todo: StepOne, StepTwo, StepThree 상황에 맞게 노출부탁드립니다. */}
        {userData ? (
          <StepOne
            userProfile={userData}
            updateProfile={{ profile: '', nickname: '' }} // 초기값을 전달
            onSave={handleSave}
          />
        ) : (
          <div>No user data available</div>
        )}
        {/* <StepTwo /> */}
        {/* <StepThree /> */}
        {/* <StepThree /> */}
      </div>
    </div>
  );
};

export default NewProfile;
