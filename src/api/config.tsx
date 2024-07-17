// api base 설정
import axios from 'axios';

export const mockAxios = axios.create({
  baseURL: 'https://api.moime.app/',
  headers: {
    accept: '*/*',
    Authorization:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiaXNzIjoiY2FweWJhcmEiLCJyb2xlcyI6IkFETUlOIiwiaWF0IjoxNzE1MDAyNDYzLCJleHAiOjE3MjI3Nzg0NjN9.eeDxdX6__dE0raAMdKbXt0fwsMfDTAww0TfJmflkEPyHZQar5DDi1WSPZbgQx9T7l25F4gFWsvTPz8IqumV-Kg',
  },
});
