import apiClient from '../config';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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

const getUserInfo = () => {
  return axios
    .get('/users/my')
    .then((response) => {
      return response.data; // 데이터 반환 (필요에 따라 사용)
    })
    .catch((error) => {
      console.error('Error fetching user info:', error);
      throw error; // 에러 처리 (필요에 따라 사용)
    });
};

export { getUserInfo, testApi };
