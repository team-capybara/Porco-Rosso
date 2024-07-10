import React from 'react';
import './styles/css/common.css';
import './styles/scss/common.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
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
  );
}
export default App;
