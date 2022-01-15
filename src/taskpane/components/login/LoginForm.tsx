import * as React from "react";
import { useState } from "react";
import { MessageBar, MessageBarType, PrimaryButton, Spinner, SpinnerSize, Stack, TextField } from "@fluentui/react";
import "./LoginForm.scss";
import AuthService from "../services/AuthService";
import usePrep from "../state/PreparationStore";

enum LoginState {
  idle,
  waiting,
  success,
  invalid,
  error,
}

export default function LoginForm(_props: unknown): JSX.Element {
  // global state
  const [prepState, prepActions] = usePrep();

  // local state
  const [username, setUsername] = useState(null as string);
  const [password, setPassword] = useState(null as string);
  const [loginState, setLoginState] = useState(LoginState.idle);

  async function submitLogin() {
    setLoginState(LoginState.waiting);
    const authData = await AuthService.login(username, password);
    prepActions.setAuthData(authData);
    setLoginState(LoginState.success);
    setTimeout(() => {
      // Return to main screen
      prepActions.setLoggedIn(true);
      setLoginState(LoginState.idle);
      prepActions.setDisplayLogin(false);
    }, 1000);
  }

  let loginMessage: unknown = "";
  switch (loginState) {
    case LoginState.success:
      loginMessage = (
        <MessageBar
          messageBarType={MessageBarType.success}
          isMultiline={true}
          onDismiss={() => setLoginState(LoginState.idle)}
          dismissButtonAriaLabel="Close"
        >
          Erfolgreich eingeloggt!
        </MessageBar>
      );
      break;
    case LoginState.invalid:
      loginMessage = (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={true}
          onDismiss={() => setLoginState(LoginState.idle)}
          dismissButtonAriaLabel="Close"
        >
          Ungültige Kombination aus Nutzername und Passwort
        </MessageBar>
      );
      break;
    case LoginState.error:
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
          {loginState === LoginState.waiting ? <Spinner size={SpinnerSize.small} /> : "Einloggen"}
        </PrimaryButton>
      </Stack>
    </div>
  );
}
