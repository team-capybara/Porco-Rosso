import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../common/utils/authUtils';

const OauthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setCookie(
      'access_token',
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiaXNzIjoiY2FweWJhcmEiLCJyb2xlcyI6IkFETUlOIiwiaWF0IjoxNzE1MDAyNDYzLCJleHAiOjE3MjI3Nzg0NjN9.eeDxdX6__dE0raAMdKbXt0fwsMfDTAww0TfJmflkEPyHZQar5DDi1WSPZbgQx9T7l25F4gFWsvTPz8IqumV-Kg',
      7
    );
    navigate('/signup');
  }, [navigate]);

  return null;
};

export default OauthRedirectHandler;
