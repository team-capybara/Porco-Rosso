import apiClient from '../config';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import { UpdateProfile } from '../../features/auth/types';
import { deleteCookie } from '../../common/utils/authUtils';

// const mock: MockAdapter = new MockAdapter(axios, { delayResponse: 800 });

// mock.onGet('/users/my').reply(200, {
//   id: 4,
//   code: '2343225',
//   nickname: '훌랄라2',
//   email: 'email@naver.com',
//   provider_type: 'google',
//   profile: 'http://dkdkslkfjl...',
// });

const getUserInfo = async () => {
  try {
    const response = await apiClient.get('/users/my');
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error; // 에러 처리 (필요에 따라 사용)
  }
};

const updateProfile = async ({
  newProfile,
  nickname,
}: UpdateProfile): Promise<void> => {
  const formData = new FormData();
  if (newProfile !== null && typeof newProfile !== 'string') {
    formData.append('profile', newProfile);
  }
  formData.append('nickname', nickname);
  try {
    const response = await apiClient.post('/users/my', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Cache-Control': 'no-cache',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

const userLogout = async () => {
  try {
    const response = await apiClient.post('/users/logout');
    window.kmpJsBridge.callNative('onLogout', ''); // 앱 로그아웃
    deleteCookie('access_token', '.moime.app');
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error; // 에러 처리 (필요에 따라 사용)
  }
};

const userWithdraw = async () => {
  try {
    const response = await apiClient.put('/users/my/withdraw');
    return response.data;
  } catch (error) {
    console.error('Error fetching userWithdraw:', error);
    throw error; // 에러 처리 (필요에 따라 사용)
  }
};

export { getUserInfo, updateProfile, userLogout, userWithdraw };
