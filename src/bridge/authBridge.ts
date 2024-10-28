import { getCookie } from '../common/utils/authUtils';

const goOnboarding = () => {
  const accessToken = getCookie('access_token');
  const loginData = {
    isNewbie: true,
    accessToken: accessToken,
  };
  // 앱 초기 오픈 시 브릿지가 등록되기 전 브릿지 호출 방지
  setTimeout(() => {
    window.kmpJsBridge?.callNative('onLoginSuccess', JSON.stringify(loginData));
  }, 500);
};

interface DeviceTokenData {
  fcmToken?: string;
}

const goMain = (accessToken: string) => {
  const loginData = {
    isNewbie: false,
    accessToken: accessToken,
  };
  console.log(accessToken, 'accessToken');
  console.log(loginData, 'loginData');
  window.kmpJsBridge?.callNative(
    'onLoginSuccess',
    JSON.stringify(loginData),
    function (data: string) {
      // 브릿징은 string 형태 외에 주고 받을 수 없음
      const parsedData: DeviceTokenData = JSON.parse(data);
      const { fcmToken = '' } = parsedData;
      // deviceToken 서버로 전달
      localStorage.setItem('deviceToken', fcmToken);
    }
  );
};

export { goOnboarding, goMain };
