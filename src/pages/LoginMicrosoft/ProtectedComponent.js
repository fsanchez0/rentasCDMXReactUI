import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import {useEffect, useState} from "react";

function ProtectedComponent() {
    const { instance, inProgress, accounts } = useMsal();
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        if (!apiData && inProgress === InteractionStatus.None) {
            const accessTokenRequest = {
                scopes: ["user.read"],
                account: accounts[0],
            };
            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((accessTokenResponse) => {
                    // Acquire token silent success
                    let accessToken = accessTokenResponse.accessToken;
                    console.log(accessToken);
                    // Call your API with token
                    /*callApi(accessToken).then((response) => {
                        setApiData(response);
                    });*/
                })
                .catch((error) => {
                    if (error instanceof InteractionRequiredAuthError) {
                        instance
                            .acquireTokenPopup(accessTokenRequest)
                            .then(function (accessTokenResponse) {
                                // Acquire token interactive success
                                let accessToken = accessTokenResponse.accessToken;
                                // Call your API with token
                                /*callApi(accessToken).then((response) => {
                                    setApiData(response);
                                });*/
                            })
                            .catch(function (error) {
                                // Acquire token interactive failure
                                console.log(error);
                            });
                    }
                    console.log(error);
                });
        }
    }, [instance, accounts, inProgress, apiData]);

    return <p>Return your protected content here: {apiData}</p>;
}