import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import AppProvider from '@/providers';

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
