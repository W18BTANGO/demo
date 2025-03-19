import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css'; // Ensure this file exists or update the path

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);