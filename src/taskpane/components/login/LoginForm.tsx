import * as React from "react";
import { PrimaryButton, SpinnerSize, Stack, TextField, Spinner, MessageBar, MessageBarType } from "@fluentui/react";
import "./LoginForm.scss";
import AuthService from "./AuthService";
import { useState } from "react";

export default function LoginForm(_props: any) {
  const [username, setUsername] = useState(null as string);
  const [password, setPassword] = useState(null as string);
  const [waiting, setWaiting] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(null as boolean);

  function onLoginSubmit() {
    setWaiting(true);
    AuthService.login(username, password).then((loginSuccessful) => {
      setLoginSuccessful(loginSuccessful);
      setWaiting(false);
    });
  }

  return (
    <div id="login-form">
      {loginSuccessful != null && !loginSuccessful ? (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={true}
          onDismiss={() => setLoginSuccessful(null)}
          dismissButtonAriaLabel="Close"
        >
          Ungültige Kombination aus Nutzername und Passwort
        </MessageBar>
      ) : (
        ""
      )}
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
