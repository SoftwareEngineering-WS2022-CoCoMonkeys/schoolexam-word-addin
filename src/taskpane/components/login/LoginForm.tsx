import * as React from "react";
import axios from "axios";
import { PrimaryButton, SpinnerSize, Stack, TextField, Spinner, MessageBar, MessageBarType } from "@fluentui/react";
import "./LoginForm.scss";
import AuthService from "./AuthService";

export interface LoginFormState {
  username: string | null;
  password: string | null;
  waitingForResponse: boolean;
  loginSuccessful: boolean | null;
}

export default class LoginForm extends React.Component<any, LoginFormState> {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      waitingForResponse: false,
      loginSuccessful: null,
    };
  }

  private readonly onLoginSubmit = () => {
    this.setState({
      waitingForResponse: true,
    });
    AuthService.login(this.state.username, this.state.password).then((loginSuccessful) => {
      this.setState({ loginSuccessful: loginSuccessful, waitingForResponse: false });
    });
  };

  render() {
    return (
      <div id="login-form">
        {this.state.loginSuccessful != null && !this.state.loginSuccessful ? (
          <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={true}
            onDismiss={() => this.setState({ loginSuccessful: null })}
            dismissButtonAriaLabel="Close"
          >
            Ungültige Kombination aus Nutzername und Passwort
          </MessageBar>
        ) : (
          ""
        )}
        <Stack>
          <TextField label="Nutzername" onChange={(event) => this.setState({ username: event.currentTarget.value })} />
          <TextField label="Passwort" onChange={(event) => this.setState({ password: event.currentTarget.value })} />
          <PrimaryButton id="submit-login-btn" className="margin-btn" onClick={this.onLoginSubmit}>
            {this.state.waitingForResponse ? <Spinner size={SpinnerSize.small} /> : "Einloggen"}
          </PrimaryButton>
        </Stack>
      </div>
    );
  }
}
