import BackNavigation from '../auth/components/signup/BackNavigation';
// import AlarmSetting from './components/AlarmSetting/AlarmSetting';
// import MyPageMain from './components/MyPageMain/MyPageMain';
// import ReviseProfile from './components/ReviseProfile/ReviseProfile';
import { mypageProps } from './types/index';

const MypagePage = (props: mypageProps) => {
  console.log(props);
  return (
    <div>
      <BackNavigation classNameForIconType="close_type" />
      {/* 마이페이지 메인 */}
      {/* <MyPageMain /> */}
      {/* 프로필 수정 */}
      {/* <ReviseProfile /> */}
      {/* 알림 설정 */}
      {/* <AlarmSetting /> */}
    </div>
  );
};

export default MypagePage;
