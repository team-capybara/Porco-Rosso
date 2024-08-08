import { useEffect } from 'react';
import { getCookie } from '../../common/utils/authUtils';
import { useLocation, useNavigate } from 'react-router-dom';

const OauthRedirectHandler = () => {
  //old bie 랜딩
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = getCookie('access_token');
    console.log(accessToken, 'old bie access token 받아옴');

    // 로그인 오류 처리
    if (!accessToken) {
      // 다시 로그인으로
      navigate('/', { state: { from: location } });
    } else {
      // 앱 메인으로 브릿징
      alert('앱 메인으로 브릿징 작업 필요');
    }
  }, [location, navigate]);

  return null;
};

export default OauthRedirectHandler;
