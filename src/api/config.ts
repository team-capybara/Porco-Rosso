import axios from 'axios';
import { getCookie } from '../common/utils/authUtils';

export const mockAxios = axios.create({
  baseURL: 'https://moime.app/',
  headers: {
    accept: '/',
    Authorization:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiY2FweWJhcmEiLCJyb2xlcyI6Ik1FTUJFUiIsImlhdCI6MTcyMjg2OTg5M30.V3xnnSSEz5ykPrZB5cFCTZ5oLApY30EJ7Mgv0UYWOxNJbjgCngoD9HiQ5SP4FFHtd327_1OcmQdOv-mQ3LcgUg',
  },
});

// api base 설정
const mockToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiY2FweWJhcmEiLCJyb2xlcyI6Ik1FTUJFUiIsImlhdCI6MTcyMjg2OTg5M30.V3xnnSSEz5ykPrZB5cFCTZ5oLApY30EJ7Mgv0UYWOxNJbjgCngoD9HiQ5SP4FFHtd327_1OcmQdOv-mQ3LcgUg';

// 기본 설정을 가진 axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'https://moime.app/',
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie('access_token') || mockToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
