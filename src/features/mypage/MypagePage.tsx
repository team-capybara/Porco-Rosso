import { useState } from 'react';
import BackNavigation from '../auth/components/signup/BackNavigation';
import AlarmSetting from './components/AlarmSetting/AlarmSetting';
import MyPageMain from './components/MyPageMain/MyPageMain';
import ReviseProfile from './components/ReviseProfile/ReviseProfile';
import { mypageProps } from './types/index';
import { UserProfile } from '../auth/types';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../api/service/authApi';
import { renderComponentType } from './types/index';

const MypagePage = (props: mypageProps) => {
  const [renderComponent, setRenderComponent] =
    useState<renderComponentType>('mypageMain');

  const { data: userData } = useQuery<UserProfile>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  console.warn(userData, 'userData에요요요용');
  console.warn(props, 'props');

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
      {renderComponent === 'reviseProfile' && <ReviseProfile />}
      {/* 알림 설정 */}
      {renderComponent === 'alarmSetting' && <AlarmSetting />}
    </div>
  );
};

export default MypagePage;
