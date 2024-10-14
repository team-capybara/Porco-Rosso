import { useState } from 'react';
import BackNavigation from '../auth/components/signup/BackNavigation';
import AlarmSetting from './components/AlarmSetting/AlarmSetting';
import MyPageMain from './components/MyPageMain/MyPageMain';
// import ReviseProfile from './components/ReviseProfile/ReviseProfile';
import { mypageProps } from './types/index';
import { UserProfile } from '../auth/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserInfo } from '../../api/service/authApi';
import { renderComponentType } from './types/index';
import StepOne from '../auth/components/signup/StepOne';
import { updateProfile } from '../../api/service/authApi';
import { UpdateProfile } from '../auth/types';

const MypagePage = (props: mypageProps) => {
  const queryClient = useQueryClient();
  const [renderComponent, setRenderComponent] =
    useState<renderComponentType>('mypageMain');

  const { data: userData, refetch } = useQuery<UserProfile>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  console.warn(props, 'props');
  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });

  const handleSave = (updatedProfile: UpdateProfile) => {
    mutation.mutate(updatedProfile);
    setRenderComponent('mypageMain');
    refetch();
    getUserInfo();
  };

  return (
    <div>
      <BackNavigation
        classNameForIconType="close_type"
        isButton={true}
        onClick={() => {
          if (renderComponent === 'mypageMain') {
            location.href = '/'; // 수정 필요: 어디로 보내야하나..
          } else {
            setRenderComponent('mypageMain');
          }
        }}
      />
      {/* 마이페이지 메인 */}
      {renderComponent === 'mypageMain' && (
        <MyPageMain
          userProfile={userData!}
          setRenderComponent={setRenderComponent}
        />
      )}
      {/* 프로필 수정 */}
      {/* 공통화 테스트중 */}
      {/* {renderComponent === 'reviseProfile' && <ReviseProfile />} */}
      {renderComponent === 'reviseProfile' && userData && (
        <StepOne
          userProfile={userData}
          updateProfile={{
            newProfile: null,
            nickname: userData.nickname,
          }} // 초기값을 전달
          onSave={handleSave}
          mode="mypage"
        />
      )}
      {/* 알림 설정 */}
      {renderComponent === 'alarmSetting' && <AlarmSetting />}
    </div>
  );
};

export default MypagePage;
