import { useEffect } from 'react';
import { getCookie } from '../../common/utils/authUtils';
import { useLocation, useNavigate } from 'react-router-dom';
import { goMain } from '../../bridge/authBridge';

const OauthRedirectHandler = () => {
  //old bie 랜딩
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = getCookie('access_token');

    // 로그인 오류 처리
    if (!accessToken) {
      // 다시 로그인으로
      navigate('/', { state: { from: location } });
    } else {
      // 앱 메인으로 브릿징, 원래라면 활성화 해야하는 코드
      // 앱 초기 오픈 시 브릿지가 등록되기 전 브릿지 호출 방지
      setTimeout(() => {
        goMain(accessToken);
      }, 500);
      // 올드비로도 signup 페이지 테스트 필요할 때 활성화, 원래라면 비활성화
      // navigate('/signup', { state: { from: location } });
    }
  }, [location, navigate]);

  return null;
};

export default OauthRedirectHandler;
