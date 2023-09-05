import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
// import { SpaceProvider } from './contexts/SpaceContext';
import ContextProviders from './contexts/ContextProviders';
// import { ControlTypeProvider } from './contexts/LookupControlTypeContext';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProviders>
      <App />
    </ContextProviders>
  </React.StrictMode>
);

reportWebVitals();
