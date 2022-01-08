import * as React from "react";
import { PrimaryButton, SpinnerSize, Stack, TextField, Spinner, MessageBar, MessageBarType } from "@fluentui/react";
import "./LoginForm.scss";
import AuthService from "../services/AuthService";
import { useState } from "react";

export interface LoginFormProps {
  setDisplayLogin: (displayLogin: boolean) => void;
  setLoggedIn: (loggedIn: boolean) => void;
}

export default function LoginForm(props: LoginFormProps) {
  const [username, setUsername] = useState(null as string);
  const [password, setPassword] = useState(null as string);
  const [waiting, setWaiting] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(null as boolean);

  function onLoginSubmit() {
    setWaiting(true);
    AuthService.login(username, password)
      .then((loginSuccessful) => {
        setLoginSuccessful(loginSuccessful);
        setTimeout(() => {
          // Return to main screen
          props.setLoggedIn(true);
          props.setDisplayLogin(false);
        }, 1000);
      })
      .finally(() => {
        setWaiting(false);
      });
  }

  let loginMessage: any = "";
  if (loginSuccessful != null) {
    loginMessage = loginSuccessful ? (
      <MessageBar
        messageBarType={MessageBarType.success}
        isMultiline={true}
        onDismiss={() => setLoginSuccessful(null)}
        dismissButtonAriaLabel="Close"
      >
        Erfolgreich eingeloggt!
      </MessageBar>
    ) : (
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={true}
        onDismiss={() => setLoginSuccessful(null)}
        dismissButtonAriaLabel="Close"
      >
        Ungültige Kombination aus Nutzername und Passwort
      </MessageBar>
    );
  }

  return (
    <div id="login-form">
      {loginMessage}
      <Stack>
        <TextField label="Nutzername" onChange={(event) => setUsername(event.currentTarget.value)} />
        <TextField label="Passwort" onChange={(event) => setPassword(event.currentTarget.value)} />
        <PrimaryButton id="submit-login-btn" className="margin-btn" onClick={onLoginSubmit}>
          {waiting ? <Spinner size={SpinnerSize.small} /> : "Einloggen"}
        </PrimaryButton>
      </Stack>
    </div>
  );
}
