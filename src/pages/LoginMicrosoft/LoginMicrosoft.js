import React, { useState } from "react";
import {Button, CircularProgress, Fade, Grid, TextField, Typography, useTheme} from "@mui/material";

import logo from "../../images/logotipo.svg";
import microsoft from "../../images/microsoft.svg";

import {useMsal} from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

import {styled} from "@mui/system";

function LoginMicrosoft(props) {

    var [isLoading, setIsLoading] = useState(false);
    var [isLoadingMicrosoft, setIsLoadingMicrosoft] = useState(false);
    var [error, setError] = useState(null);
    var [loginValue, setLoginValue] = useState("");
    var [passwordValue, setPasswordValue] = useState("");

    // microsoft
    const { instance, accounts, inProgress } = useMsal();
    const [accessToken, setAccessToken] = useState(null);
    const handleLogin = (loginType) => {
        if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }
        RequestAccessToken();
        console.log(accounts);
    }

    function RequestAccessToken() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            setAccessToken(response.accessToken);
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                setAccessToken(response.accessToken);
            });
        });
    }

    const MyGrid = styled(Grid)({
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
    });

    const DivLogotypeContainer = styled('div')(({ theme }) => ({
        backgroundColor: "rgba(159, 33, 33, 0.9)",//theme.palette.error.dark,
        width: "60%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            width: "50%",
        },
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    }));

    const LogoTypeImg = styled('img')(({ theme }) => ({
        width: 420,
        marginBottom: theme.spacing(4),
    }));

    const LogoTypeText = styled(Typography)(({ theme }) => ({
        color: "white",
        fontWeight: 500,
        fontSize: 52,
        [theme.breakpoints.down("md")]: {
            fontSize: 48,
        },
    }));

    const FormContainer = styled('div')(({ theme }) => ({
        width: "40%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            width: "50%",
        },
    }));

    const Form = styled('div')(({ theme }) => ({
        width: 320,
    }));

    const Greeting = styled(Typography)(({ theme }) => ({
        fontWeight: 500,
        textAlign: "center",
        marginTop: theme.spacing(4),
    }));

    const MicrosoftButton = styled(Button)(({ theme }) => ({
        marginTop: theme.spacing(6),
        boxShadow: theme.shadows[2],
        backgroundColor: "white",
        width: "100%",
        textTransform: "none",
    }));

    const MicrosoftIcon = styled('img')(({ theme }) => ({
        width: 30,
        marginRight: theme.spacing(2),
    }));

    const FormDividerContainer = styled('div')(({ theme }) => ({
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        display: "flex",
        alignItems: "center",
    }));

    const FormDivider = styled('div')(({ theme }) => ({
        flexGrow: 1,
        height: 1,
        backgroundColor: theme.palette.text.hint + "40",
    }));

    return (
        <MyGrid container>
            <DivLogotypeContainer>
                <LogoTypeImg src={logo} alt="logo"  />
                <LogoTypeText>Administración de Rentas</LogoTypeText>
            </DivLogotypeContainer>
            <FormContainer>
                <Form>
                    <React.Fragment>
                        <Greeting variant="h1">
                            Bienvenido!
                        </Greeting>
                        <MicrosoftButton
                            size="large"
                            onClick={() => handleLogin("redirect")} >

                            <MicrosoftIcon src={microsoft} alt="microsoft logo"></MicrosoftIcon>
                            &nbsp;Continuar con Microsoft
                        </MicrosoftButton>
                        <FormDividerContainer>
                            <FormDivider/>
                        </FormDividerContainer>
                        <Fade in={isLoadingMicrosoft}>
                            <CircularProgress size={52} sx={{ paddingLeft: 4 }} />
                        </Fade>
                        <Fade in={error}>
                            <Typography color="secondary" sx={{ textAlign: "center" }}>
                                Error, Usuario o Contraseña Incorrectos :(
                            </Typography>
                        </Fade>
                        <TextField
                            id="email"
                            value={loginValue}
                            onChange={e => setLoginValue(e.target.value)}
                            margin="normal"
                            placeholder="Correo"
                            type="email"
                            fullWidth />
                        <TextField
                            id="password"
                            value={passwordValue}
                            onChange={ e => setPasswordValue(e.target.value)}
                            margin={"normal"}
                            placeholder={"Contraseña"}
                            type={"password"}
                            fullWidth />
                        <div >
                            {isLoading ? (
                                <CircularProgress size={26} />
                            ) : (
                                <Button
                                    disabled={
                                        loginValue.length === 0 || passwordValue.length === 0
                                    }
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                >
                                    Iniciar
                                </Button>
                            )}
                            <Button
                                color="primary"
                                size="large"
                            >
                                Olvidé la contraseña
                            </Button>
                        </div>
                    </React.Fragment>
                </Form>
            </FormContainer>
        </MyGrid>
    );
}

export default LoginMicrosoft;