import axios from 'axios';
import { getCookie } from '../common/utils/authUtils';

export const mockAxios = axios.create({
  baseURL: 'https://api.moime.app/external',
  headers: {
    accept: '/',
    Authorization:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMSIsImlzcyI6ImNhcHliYXJhIiwicm9sZXMiOiJNRU1CRVIiLCJpYXQiOjE3MjY3MzMwOTl9.WJnzeXL8LmBsQIn-w9rINeooebjCbfy39ETWd4H98StT-jGx5cuH8_J0jkIPoNh_G7zxuSbo51xykb9vBolC7w',
  },
});

// api base 설정
const mockToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMSIsImlzcyI6ImNhcHliYXJhIiwicm9sZXMiOiJNRU1CRVIiLCJpYXQiOjE3MjY3MzMwOTl9.WJnzeXL8LmBsQIn-w9rINeooebjCbfy39ETWd4H98StT-jGx5cuH8_J0jkIPoNh_G7zxuSbo51xykb9vBolC7w';

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
