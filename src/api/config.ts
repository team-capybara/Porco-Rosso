import axios from 'axios';
import { getCookie, getTokenFromApp } from '../common/utils/authUtils';

// api base 설정
const mockToken =
  // 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiY2FweWJhcmEiLCJyb2xlcyI6Ik1FTUJFUiIsImlhdCI6MTcyMjg2OTg5M30.V3xnnSSEz5ykPrZB5cFCTZ5oLApY30EJ7Mgv0UYWOxNJbjgCngoD9HiQ5SP4FFHtd327_1OcmQdOv-mQ3LcgUg';
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMSIsImlzcyI6ImNhcHliYXJhIiwicm9sZXMiOiJNRU1CRVIiLCJpYXQiOjE3MjY3MzMwOTl9.WJnzeXL8LmBsQIn-w9rINeooebjCbfy39ETWd4H98StT-jGx5cuH8_J0jkIPoNh_G7zxuSbo51xykb9vBolC7w'; // 누리
// 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMSIsImlzcyI6ImNhcHliYXJhIiwicm9sZXMiOiJNRU1CRVIiLCJpYXQiOjE3MjkxNzE0MDd9.cHUz1D5cjaUlxoUg5DwFgO66tFlapJIbxdyePbbDfujklJ5qkN2bxtfYotRyXT9srG6sBlk4uVquB76g_wob8Q';
// 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNyIsImlzcyI6ImNhcHliYXJhIiwicm9sZXMiOiJNRU1CRVIiLCJpYXQiOjE3Mjg2Mjg2NDd9.wMgT7Xg4r49KgF5_LPyTCoV4jsLpLZMgbsdn5oOzUzxv9rs-h6Dep4hl_Hk4thzxIB2EX3OmLj5s_GQBdce0iQ';
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
  (config) => {
    // 앱 -> 웹 토큰으로 통일
    // mock token 제거 했습니다 -> 테스트 시 필요하면 || 뒤에 넣어서 사용하세요.
    const token = getTokenFromApp() || getCookie('access_token') || '';
    const deviceToken = getCookie('deviceToken') || '';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (deviceToken) {
      config.headers['Device-Token'] = deviceToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
