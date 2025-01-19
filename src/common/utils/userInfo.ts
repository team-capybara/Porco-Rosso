import { getUserInfo } from '../../api/service/authApi';
import { getCookie, setCookie } from './authUtils';

// 같은 사람이 다른 소셜 아이디로 로그인할 때, 아이디값 안바뀜(로그아웃 시 쿠키 삭제 체크)
// 아래 로직은 쿠키에 userId가 없어야 새로 세팅해주기 때문
export const getUserInfoId = () => {
  const id = getCookie('userId');
  if (id) return id;
  else return setUserInfoId();
};

export const setUserInfoId = async () => {
  const response = await getUserInfo();
  const id = response.id;
  id && setCookie('userId', id, 1);
  return id;
};
