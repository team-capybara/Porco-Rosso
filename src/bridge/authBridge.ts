import { getCookie } from '../common/utils/authUtils';

const goOnboarding = () => {
  console.log('고온보딩 브릿지 스위치 온');
  // 객체가 있을때만 조건분기하는거 꼭 필요한가?
  const accessToken = getCookie('access_token');
  console.log(accessToken, '온보딩으로 보낼 때 액세스 토큰');
  if (window.kmpJsBridge) {
    window.kmpJsBridge.callNative(
      'goOnboarding',
      JSON.stringify({ message: accessToken })
    );
  }
};

const goMain = (accessToken: string) => {
  console.log('go main 브릿징 스위치 온');
  console.log(accessToken, '메인으로 보낼 때 액세스 토큰');
  window.kmpJsBridge.callNative(
    'goMain',
    JSON.stringify({ message: accessToken }),
    function (data) {
      console.log(data, '앱에서 웹으로 device token data전송');
      localStorage.setItem('deviceToken', data);
      // deviceToken 서버로 전달
    }
  );
};

export { goOnboarding, goMain };
