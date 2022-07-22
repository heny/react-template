import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from 'react-query-devtools';
import Helmet from 'react-helmet';
import Routes from '@/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false, // 接口请求失败不重新尝试
    },
  },
});

function App() {
  const appName = process.env.REACT_APP_NAME;

  return (
    <BrowserRouter basename={process.env.PUBLIC_PATH}>
      <QueryClientProvider client={queryClient}>
        <Helmet titleTemplate={`%s · ${appName}`} defaultTitle={appName} />
        <Routes />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
