import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { ReactQueryDevtools } from 'react-query-devtools';
import { Helmet } from 'react-helmet-async';
import Routes from '@/router';

function App() {
  const appName = process.env.REACT_APP_NAME;

  return (
    <BrowserRouter basename={process.env.PUBLIC_PATH}>
      <Helmet titleTemplate={`%s · ${appName}`} defaultTitle={appName} />
      <Routes />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </BrowserRouter>
  );
}

export default App;
