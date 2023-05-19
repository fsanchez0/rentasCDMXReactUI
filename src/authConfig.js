import config from "./config";

export const msalConfig = {
    auth: {
        clientId: "cb31a8a1-046e-45c6-910a-c5c302ff0dbc",
        authority: "https://login.microsoftonline.com/597ed3a6-16a6-4546-869a-f5e74c8969bf", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
        redirectUri: config.authRedirectUri,
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me"
};