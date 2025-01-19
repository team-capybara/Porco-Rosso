import axios from 'axios';
import {
  getCookie,
  getTokenFromApp,
  getTokenFromAppByBridge,
} from '../common/utils/authUtils';

// api base 설정
const mockToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMSIsImlzcyI6ImNhcHliYXJhIiwicm9sZXMiOiJNRU1CRVIiLCJpYXQiOjE3MjY3MzMwOTl9.WJnzeXL8LmBsQIn-w9rINeooebjCbfy39ETWd4H98StT-jGx5cuH8_J0jkIPoNh_G7zxuSbo51xykb9vBolC7w'; // 누리
// 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMSIsImlzcyI6ImNhcHliYXJhIiwicm9sZXMiOiJNRU1CRVIiLCJpYXQiOjE3MjkxNzE0MDd9.cHUz1D5cjaUlxoUg5DwFgO66tFlapJIbxdyePbbDfujklJ5qkN2bxtfYotRyXT9srG6sBlk4uVquB76g_wob8Q';
// 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1MiIsImlzcyI6ImNhcHliYXJhIiwicm9sZXMiOiJNRU1CRVIiLCJpYXQiOjE3MzIyNTgwNzF9._2W8RUbCU_GhPY4OrDR7GdcLOvDblLP0J5YHfZp1z1SvjZU-B6-ktC4bhAfcA6sj85MphiNz5BLzeAwwnYftsw'; // 승현
console.log(mockToken);

// 기본 설정을 가진 axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'https://api.moime.app/external',
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // 앱 -> 웹 토큰 브라우저 저장소에서 가져옴 (android 작동, ios 미작동) ||
      // 앱 -> 웹 토큰 브릿지로 가져움 (ios를 위한 방어 로직) ||
      // 앱 오류 시 로그인 시 받은 웹 토큰 사용 ||
      // mock token 제거 했습니다 -> 테스트 시 필요하면 마지막 || 뒤에 넣어서 사용
      const token =
        getCookie('access_token') ||
        getTokenFromApp() ||
        (await getTokenFromAppByBridge()) ||
        // 위 앱에서 토큰 가져오는 방식이, 앱을 한번도 안 거친 첫 소셜 로그인 페이지에서 유저정보를 가지고 오는 요청을 보낼 때, 에러를 일으켜서 초기 로그인 화면에서 오류를 발생시키고 있음, 위 두 함수를 수정하거나, 첫 로그인 시 요청의 경우 헤더 설정을 분기하거나 등등의 해결방법을 고민해야함
        '';
      const deviceToken = getCookie('deviceToken') || '';

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      if (deviceToken) {
        config.headers['Device-Token'] = deviceToken;
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
