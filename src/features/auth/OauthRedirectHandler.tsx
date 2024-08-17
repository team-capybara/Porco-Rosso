import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../common/utils/authUtils';

const OauthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setCookie(
      'access_token',
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiY2FweWJhcmEiLCJyb2xlcyI6Ik1FTUJFUiIsImlhdCI6MTcyMjg2OTg5M30.V3xnnSSEz5ykPrZB5cFCTZ5oLApY30EJ7Mgv0UYWOxNJbjgCngoD9HiQ5SP4FFHtd327_1OcmQdOv-mQ3LcgUg',
      7
    );
    navigate('/signup');
  }, [navigate]);

  return null;
};

export default OauthRedirectHandler;
