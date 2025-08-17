import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Adjust path if your App component is elsewhere
import './index.css'; // Optional: Import global CSS if needed

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);