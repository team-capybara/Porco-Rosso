import apiClient from '../config';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { UpdateProfile } from '../../features/auth/types';

const mock: MockAdapter = new MockAdapter(axios, { delayResponse: 800 });

mock.onGet('/users/my').reply(200, {
  id: 4,
  code: '2343225',
  nickname: '훌랄라2',
  email: 'email@naver.com',
  provider_type: 'google',
  profile: 'http://dkdkslkfjl...',
});

const testApi = () => {
  return apiClient
    .get('/mock/moims/1/photos')
    .then((response) => {
      console.log(response.data.data, 'response.data에요요옹오');
      const res = response.data.data;
      return res;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
};

const getUserInfo = async () => {
  try {
    const response = await axios.get('/users/my');
    console.log(response.data, '뭐징');
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
  console.log(newProfile, nickname, '요청은 가나');
  try {
    console.log('요청은 가나');
    const formData = new FormData();
    if (newProfile !== null && typeof newProfile !== 'string') {
      formData.append('profile', newProfile);
    }
    formData.append('nickname', nickname);

    const response = await axios.put('/users/my/', formData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export { getUserInfo, testApi, updateProfile };
