import { getUserInfo } from '../../api/service/authApi';
import { getCookie, setCookie } from './authUtils';

export const getUserInfoId = () => {
  const id = getCookie('userId');
  if (id) return id;
  else return setUserInfoId();
};

export const setUserInfoId = async () => {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const response = await getUserInfo();
  const id = response.id;
  id && setCookie('userId', id, 1);
  return id;
};
