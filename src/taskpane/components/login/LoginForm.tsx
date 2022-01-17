import * as React from "react";
import { useEffect, useState } from "react";
import { MessageBar, MessageBarType, PrimaryButton, Spinner, SpinnerSize, TextField } from "@fluentui/react";
import "./LoginForm.scss";
import RequestStatus from "../state/RequestStatus";
import useAuth from "../state/AuthenticationStore";

export default function LoginForm(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [authState, authActions] = useAuth();

  // LOCAL STATE
  const [username, setUsername] = useState(null as string);
  const [password, setPassword] = useState(null as string);

  useEffect(() => {
    console.log(authState);
  });

  let loginMessage: unknown = "";
  switch (authState.loginStatus) {
    case RequestStatus.SUCCESS:
      loginMessage = (
        <MessageBar
          messageBarType={MessageBarType.success}
          isMultiline={true}
          onDismiss={() => authActions.setLoginStatus(RequestStatus.IDLE)}
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
          onDismiss={() => authActions.setLoginStatus(RequestStatus.IDLE)}
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
      <form>
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
        <PrimaryButton
          id="submit-login-btn"
          className="margin-top1"
          onClick={() => authActions.login(username, password)}
          text={authState.loginStatus !== RequestStatus.WAITING ? "Einloggen" : undefined}
        >
          {authState.loginStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
        </PrimaryButton>
      </form>
    </div>
  );
}
