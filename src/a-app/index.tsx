import React from 'react';
import ReactDOM from 'react-dom/client';
// import './styles/index.css';
import { StoreProvider } from './providers/store';
import { AppRouter } from './providers/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <AppRouter/>
    </StoreProvider>
  </React.StrictMode>
);
