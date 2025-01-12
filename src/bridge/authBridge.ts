import { getCookie, setCookie } from '../common/utils/authUtils';

const goOnboarding = () => {
  const accessToken = getCookie('access_token');
  console.log(accessToken, 'accesToken');
  const loginData = {
    isNewbie: true,
    accessToken: accessToken,
  };
  // 앱 초기 오픈 시 브릿지가 등록되기 전 브릿지 호출 방지
  // setTimeout(() => {
  //   window.kmpJsBridge?.callNative('onLoginSuccess', JSON.stringify(loginData));
  // }, 500);
  // 브릿지 등록될 때까지 반복적으로 확인
  const interval = setInterval(() => {
    if (window.kmpJsBridge?.callNative) {
      // 브릿지가 등록되면 호출하고 반복 중단
      window.kmpJsBridge.callNative(
        'onLoginSuccess',
        JSON.stringify(loginData)
      );
      clearInterval(interval);
      console.log('브릿지 호출 성공');
    } else {
      console.log('브릿지를 찾는 중...');
    }
  }, 100);
};

interface DeviceTokenData {
  fcmToken?: string;
}

const goMain = (accessToken: string) => {
  const loginData = {
    isNewbie: false,
    accessToken: accessToken,
  };
  window.kmpJsBridge?.callNative(
    'onLoginSuccess',
    JSON.stringify(loginData),
    function (data: string) {
      // 브릿징은 string 형태 외에 주고 받을 수 없음
      const parsedData: DeviceTokenData = JSON.parse(data);
      const { fcmToken = '' } = parsedData;
      // deviceToken 서버로 전달
      setCookie('deviceToken', fcmToken, 365);
    }
  );
};

export { goOnboarding, goMain };
