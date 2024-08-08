import apiClient from '../config';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import { UpdateProfile } from '../../features/auth/types';

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
    const response = await apiClient.get('/external/users/my');
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
  const formData = new FormData();
  if (newProfile !== null && typeof newProfile !== 'string') {
    formData.append('profile', newProfile);
  }
  formData.append('nickname', nickname);
  const formProps = Object.fromEntries(formData);
  console.log(formProps, 'form데이터 찍어보기');
  try {
    const response = await apiClient.post('/external/users/my', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export { getUserInfo, updateProfile };
