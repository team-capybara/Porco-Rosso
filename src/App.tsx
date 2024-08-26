import React from 'react';
import './styles/css/common.css';
import './styles/scss/common.scss';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const [queryClient] = React.useState(() => new QueryClient());
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
