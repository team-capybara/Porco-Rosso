import { getCookie } from '../common/utils/authUtils';

const goOnboarding = () => {
  // 객체가 있을때만 조건분기하는거 꼭 필요한가?
  const accessToken = getCookie('access_token');
  console.log(accessToken, '온보딩으로 보낼 때 액세스 토큰');
  const loginData = {
    isNewbie: true,
    accessToken: accessToken,
  };
  window.kmpJsBridge.callNative('onLoginSuccess', JSON.stringify(loginData));
};

interface DeviceTokenData {
  fcmToken?: string;
}

const goMain = (accessToken: string) => {
  console.log('go main 브릿징 스위치 온');
  console.log(accessToken, '메인으로 보낼 때 액세스 토큰');
  const loginData = {
    isNewbie: false,
    accessToken: accessToken,
  };
  window.kmpJsBridge.callNative(
    'onLoginSuccess',
    JSON.stringify(loginData),
    function (data: string) {
      // 브릿징은 string 형태 외에 주고 받을 수 없음
      const parsedData: DeviceTokenData = JSON.parse(data);
      console.log(parsedData, '앱에서 웹으로 device token data전송');
      const { fcmToken = '' } = parsedData;
      // deviceToken 서버로 전달
      localStorage.setItem('deviceToken', fcmToken);
    }
  );
};

export { goOnboarding, goMain };
