import React, { useEffect } from 'react';
import './styles/css/common.css';
import './styles/scss/common.scss';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { setCookie } from './common/utils/authUtils';

function App() {
  const [queryClient] = React.useState(() => new QueryClient());

  useEffect(() => {
    // 액세스 토큰 유실 방지용 JS 함수를 전역으로 등록
    window.setAccessToken = function (token: string) {
      setCookie('access_token', token, 1);
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools //리액트쿼리 개발자도구
          initialIsOpen={true}
          buttonPosition="top-right"
          position="left"
        />
        <Router>
          <AppRoutes />
        </Router>
      </QueryClientProvider>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerStyle={{
          top: 0,
          left: 0,
          bottom: 120,
          right: 0,
        }}
      />
    </>
  );
}
export default App;
