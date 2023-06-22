import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FilterState from './context/FilterState';
import ContextState from './context/ContextState';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
    domain="dev-khtcvmw7bsjdivbd.us.auth0.com"
    clientId="6XBxpbyQpvGfcav20a7K9GnlIYQ5M3AD"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    screen_hint="signup" // here
  > <BrowserRouter>
  <ContextState>
      <App />
  </ContextState>
  </BrowserRouter></Auth0Provider>
   
);


