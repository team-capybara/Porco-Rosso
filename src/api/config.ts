import axios from 'axios';
import { getCookie } from '../common/utils/authUtils';

export const mockAxios = axios.create({
  baseURL: 'https://api.moime.app/',
  headers: {
    accept: '/',
    Authorization:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiaXNzIjoiY2FweWJhcmEiLCJyb2xlcyI6IkFETUlOIiwiaWF0IjoxNzE1MDAyNDYzLCJleHAiOjE3MjI3Nzg0NjN9.eeDxdX6__dE0raAMdKbXt0fwsMfDTAww0TfJmflkEPyHZQar5DDi1WSPZbgQx9T7l25F4gFWsvTPz8IqumV-Kg',
  },
});

// api base 설정
const mockToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiaXNzIjoiY2FweWJhcmEiLCJyb2xlcyI6IkFETUlOIiwiaWF0IjoxNzE1MDAyNDYzLCJleHAiOjE3MjI3Nzg0NjN9.eeDxdX6__dE0raAMdKbXt0fwsMfDTAww0TfJmflkEPyHZQar5DDi1WSPZbgQx9T7l25F4gFWsvTPz8IqumV-Kg';

// 기본 설정을 가진 axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'https://api.moime.app/',
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
