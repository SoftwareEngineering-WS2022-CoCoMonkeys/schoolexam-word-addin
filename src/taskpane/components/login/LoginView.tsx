import * as React from "react";
import { useState } from "react";
import { MessageBar, MessageBarType, PrimaryButton, Spinner, SpinnerSize, Stack, TextField } from "@fluentui/react";
import "./LoginView.scss";
import RequestStatus from "../../../state/RequestStatus";
import useAuth from "../../../store/AuthenticationStore";

/**
 * React component to handle the user login.
 * The state is handled in the global authentication MicroStore ({@link useAuth}).
 * @component
 */
export default function LoginView(): JSX.Element {
  // GLOBAL STATE
  const [authState, authActions] = useAuth();

  // LOCAL STATE
  const [username, setUsername] = useState(null as string);
  const [password, setPassword] = useState(null as string);

  /** What message to display, success or failure */
  let statusMessage: unknown;
  switch (authState.loginStatus) {
    case RequestStatus.SUCCESS:
      statusMessage = (
        <MessageBar
          messageBarType={MessageBarType.success}
          isMultiline={true}
          onDismiss={() => authActions.setLoginStatus(RequestStatus.IDLE)}
          className="msg"
        >
          Erfolgreich eingeloggt!
        </MessageBar>
      );
      break;
    case RequestStatus.SERVER_ERROR:
    case RequestStatus.CLIENT_ERROR:
    case RequestStatus.ERROR:
      statusMessage = (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={true}
          onDismiss={() => authActions.setLoginStatus(RequestStatus.IDLE)}
          className="msg"
        >
          Loginversuch fehlgeschlagen. Bitte überprüfen sie ihre Internetverbindung.
        </MessageBar>
      );
      break;
    case RequestStatus.INVALID:
      statusMessage = (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={true}
          onDismiss={() => authActions.setLoginStatus(RequestStatus.IDLE)}
          className="msg"
        >
          Ungültige Kombination aus Nutzername und Passwort
        </MessageBar>
      );
      break;
    default:
      statusMessage = "";
  }

  return (
    <Stack id="login-form" horizontal={false} horizontalAlign="center" verticalAlign="center">
      {statusMessage}
      <TextField
        className="stretch"
        placeholder="Nutzername"
        label="Nutzername"
        onChange={(event) => setUsername(event.currentTarget.value)}
      />
      <TextField
        className="stretch"
        placeholder="Passwort"
        // Passwords are treated specially
        type="password"
        label="Passwort"
        onChange={(event) => setPassword(event.currentTarget.value)}
      />

      <PrimaryButton
        id="submit-login-btn"
        onClick={() => authActions.login(username, password)}
        text={authState.loginStatus !== RequestStatus.WAITING ? "Einloggen" : undefined}
      >
        {authState.loginStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
      </PrimaryButton>
    </Stack>
  );
}
