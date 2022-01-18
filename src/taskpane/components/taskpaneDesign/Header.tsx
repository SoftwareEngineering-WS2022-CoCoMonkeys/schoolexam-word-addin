import * as React from "react";
import "./Header.scss";
import { ActionButton, IIconProps, Stack } from "@fluentui/react";
import BackButton from "../util/BackButton";
import useAuth from "../state/AuthenticationStore";

export default function Header(_props: unknown): JSX.Element {
  const [authState, authActions] = useAuth();

  const userIcon: IIconProps = { iconName: "Contact" };
  const userIconChecked: IIconProps = {
    iconName: "ReminderPerson",
  };

  const loginButton =
    authState.authData != null ? (
      <ActionButton
        id="login-btn-checked"
        className="login-btn"
        iconProps={userIconChecked}
        text={authState.authData?.user?.username ?? ""}
      />
    ) : (
      <ActionButton
        id="login-btn-unchecked"
        className="login-btn"
        iconProps={userIcon}
        text="Login"
        onClick={() => authActions.setDisplayLoginPage(true)}
      />
    );

  const headerContent = authState.displayLogin ? (
    <BackButton onBack={() => authActions.setDisplayLoginPage(false)} />
  ) : (
    loginButton
  );

  return (
    <Stack id="header" horizontal={true} horizontalAlign="end" className="stretch">
      {headerContent}
    </Stack>
  );
}
