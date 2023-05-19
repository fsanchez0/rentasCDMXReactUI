import React from "react";
import './App.css';

// context
import { useIsAuthenticated } from "@azure/msal-react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import LoginMicrosoft from "./pages/LoginMicrosoft/LoginMicrosoft";
import NavigationScroll from "./NewLayout/NavigationScroll";
import { useSelector } from "react-redux";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import themes from "./themes";
import { ThemeProvider } from "@mui/material/styles";

// routing
import Routes from './routes';

export default function App() {
    // global
    const customization = useSelector((state) => state.customization);
    const isAuthenticatedRepl = useIsAuthenticated();

  return (
      <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes(customization)}>
              <CssBaseline />
              <AuthenticatedTemplate>
                 <NavigationScroll>
                    <Routes />
                 </NavigationScroll>
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                <LoginMicrosoft/>
              </UnauthenticatedTemplate>
          </ThemeProvider>
      </StyledEngineProvider>
  );
}
