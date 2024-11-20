import React from 'react';
import ReactDOM from 'react-dom/client'; // Sử dụng 'react-dom/client' trong React 18
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
