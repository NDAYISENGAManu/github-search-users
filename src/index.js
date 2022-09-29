import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

// dev-qlf68ptv.us.auth0.com    === for Domain
// OeNR8IqJY83E5pHJ4tdjWBQ9OFCMOnZh   === for Client Id

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-qlf68ptv.us.auth0.com"
      clientId="OeNR8IqJY83E5pHJ4tdjWBQ9OFCMOnZh"
      redirectUri={window.location.origin}
      casheLocation = 'localstorage'
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
