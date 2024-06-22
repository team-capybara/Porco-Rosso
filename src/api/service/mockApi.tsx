import axios from 'axios';
import { mockAxios } from '../config';
import MockAdapter from 'axios-mock-adapter';

const mock: MockAdapter = new MockAdapter(axios, { delayResponse: 2000 });

export const getMoimePhoto = async (moimId: string): Promise<unknown> => {
  const res = await mockAxios.get(`mock/moims/${moimId}/photos`);
  const response: unknown = res.data;
  return response;
};

mock.onGet('/moims/newPhoto/true').reply(200, {
  isNew: true,
});

mock.onGet('/moims/newPhoto/false').reply(200, {
  isNew: false,
});
