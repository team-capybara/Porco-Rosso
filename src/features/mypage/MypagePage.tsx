import { useState } from 'react';
import BackNavigation from '../auth/components/signup/BackNavigation';
import AlarmSetting from './components/AlarmSetting/AlarmSetting';
import MyPageMain from './components/MyPageMain/MyPageMain';
import { UserProfile } from '../auth/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserInfo } from '../../api/service/authApi';
import { renderComponentType } from './types/index';
import StepOne from '../auth/components/signup/StepOne';
import { updateProfile } from '../../api/service/authApi';
import { UpdateProfile } from '../auth/types';
import { onPopBridge } from '../../bridge/gatheringBridge';
import DeleteUser from './components/DeleteUser/DeleteUser';

const MypagePage = () => {
  const queryClient = useQueryClient();
  const [renderComponent, setRenderComponent] =
    useState<renderComponentType>('mypageMain');

  const { data: userData } = useQuery<UserProfile>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    select: (data) => {
      // 프로필 URL 뒤에 타임스탬프를 추가하여 유니크하게 만듦
      return {
        ...data,
        profile: `${data.profile}?t=${new Date().getTime()}`,
      };
    },
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
    setRenderComponent('mypageMain');
  };

  const handleMypageBackNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (renderComponent === 'mypageMain') {
      onPopBridge();
    } else {
      setRenderComponent('mypageMain');
    }
  };

  return (
    <div>
      <BackNavigation
        classNameForIconType="close_type"
        isButton={true}
        onClick={handleMypageBackNav}
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
      {/* 계정 삭제 */}
      {renderComponent === 'deleteUser' && (
        <DeleteUser userProfile={userData!} />
      )}
    </div>
  );
};

export default MypagePage;
