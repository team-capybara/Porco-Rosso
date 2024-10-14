import {
  // useEffect,
  useState,
} from 'react';
import { UpdateProfile } from './types/index';
import classnames from 'classnames/bind';
import styles from './newProfile.module.scss';
import StepOne from './components/signup/StepOne';
// import StepThree from './components/signup/StepThree';
import { getUserInfo, updateProfile } from '../../api/service/authApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserProfile } from './types/index';
import StepThree from './components/signup/StepThree';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { getCookie } from '../../common/utils/authUtils';

const cn = classnames.bind(styles);

const NewProfile = () => {
  const queryClient = useQueryClient();
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);
  const [displayNickname, setDisplayNickname] = useState<string>('');
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   // new bie 랜딩
  //   const accessToken = getCookie('access_token');

  //   // 로그인 오류 처리
  //   if (!accessToken) {
  //     // 다시 로그인으로
  //     navigate('/', { state: { from: location } });
  //   }
  // }, [location, navigate]);

  const {
    // isLoading,
    // isFetching,
    data: userData,
    // isError,
    // error,
    refetch,
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

  const handleSave = (updatedProfile: UpdateProfile) => {
    mutation.mutate(updatedProfile);
    setSignUpSuccess(true);
    refetch();
  };

  return (
    <div className={cn('new_profile')}>
      <div>
        {/* todo: StepOne, StepTwo, StepThree 상황에 맞게 노출부탁드립니다. */}
        {userData ? (
          <>
            {!signUpSuccess && (
              <StepOne
                userProfile={userData}
                updateProfile={{
                  newProfile: null,
                  nickname: userData.nickname,
                }} // 초기값을 전달
                onSave={handleSave}
                mode="signup"
                setDisplayNickname={setDisplayNickname}
              />
            )}
            {signUpSuccess && <StepThree nickname={displayNickname} />}
          </>
        ) : (
          <div>No user data available</div>
        )}
      </div>
    </div>
  );
};

export default NewProfile;
