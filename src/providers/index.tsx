import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import QueryProvider from './QueryProvider';

// 这里可以引入其他的provider
function AppProvider({ children }: any) {
  return (
    <QueryProvider>
      <HelmetProvider>{children}</HelmetProvider>
    </QueryProvider>
  );
}

export default AppProvider;
