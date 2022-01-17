import * as React from "react";
import { useState } from "react";
import { MessageBar, MessageBarType, PrimaryButton, Spinner, SpinnerSize, Stack, TextField } from "@fluentui/react";
import "./LoginForm.scss";
import usePrep from "../state/PreparationStore";
import AuthentificationRepository from "../services/OnlineAuthenticationRepository";
import RequestStatus from "../state/RequestStatus";

export default function LoginForm(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [prepState, prepActions] = usePrep();

  // LOCAL STATE
  const [username, setUsername] = useState(null as string);
  const [password, setPassword] = useState(null as string);
  const [loginState, setLoginState] = useState(RequestStatus.IDLE);

  async function submitLogin() {
    setLoginState(RequestStatus.WAITING);
    try {
      const authData = await AuthentificationRepository.login(username, password);
      prepActions.setAuthData(authData);
      setLoginState(RequestStatus.SUCCESS);
      setTimeout(() => {
        // Return to main screen
        prepActions.setLoggedIn(true);
        setLoginState(RequestStatus.IDLE);
        prepActions.setDisplayLogin(false);
      }, 1000);
    } catch (e) {
      console.error(e);
      setLoginState(RequestStatus.ERROR);
    }
  }

  let loginMessage: unknown = "";
  switch (loginState) {
    case RequestStatus.SUCCESS:
      loginMessage = (
        <MessageBar
          messageBarType={MessageBarType.success}
          isMultiline={true}
          onDismiss={() => setLoginState(RequestStatus.IDLE)}
          dismissButtonAriaLabel="Close"
        >
          Erfolgreich eingeloggt!
        </MessageBar>
      );
      break;
    case RequestStatus.ERROR:
      loginMessage = (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={true}
          onDismiss={() => setLoginState(RequestStatus.IDLE)}
          dismissButtonAriaLabel="Close"
        >
          Ungültige Kombination aus Nutzername und Passwort
        </MessageBar>
      );
      break;
    default:
      loginMessage = "";
  }
  return (
    <div id="login-form">
      {loginMessage}
      <Stack>
        <TextField
          placeholder="Nutzername"
          label="Nutzername"
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
        <TextField
          placeholder="Passwort"
          type="password"
          label="Passwort"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <PrimaryButton id="submit-login-btn" className="margin-top1" onClick={submitLogin}>
          {loginState === RequestStatus.WAITING ? <Spinner size={SpinnerSize.small} /> : "Einloggen"}
        </PrimaryButton>
      </Stack>
    </div>
  );
}
