import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MsalProvider} from "@azure/msal-react";
import {PublicClientApplication} from "@azure/msal-browser";
import {msalConfig} from "./authConfig";
import {Provider} from "react-redux";
import {store} from "./store";
import {BrowserRouter} from "react-router-dom";
import config from "./config";

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
      <MsalProvider instance={msalInstance}>
          <BrowserRouter basename={config.basename}>
              <App />
          </BrowserRouter>
      </MsalProvider>
  </Provider>
   /* <LayoutProvider>
        <MsalProvider instance={msalInstance}>
            <UserProvider>
                <ThemeProvider theme={Themes.default}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </UserProvider>
        </MsalProvider>
    </LayoutProvider>*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
