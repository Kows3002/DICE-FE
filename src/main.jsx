import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BalanceProvider } from './context/BalanceContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BalanceProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BalanceProvider>
);