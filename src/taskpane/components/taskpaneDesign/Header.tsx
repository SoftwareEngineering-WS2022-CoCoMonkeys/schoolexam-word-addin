import * as React from "react";
import "./Header.scss";
import { ActionButton, IIconProps, Stack } from "@fluentui/react";
import useAuth from "../../../store/AuthenticationStore";

/**
 * Header row displayed above the main navigation bar.
 * @component
 */
export default function Header(): JSX.Element {
  const [authState, authActions] = useAuth();

  const userIcon: IIconProps = { iconName: "Contact" };
  const userIconChecked: IIconProps = {
    iconName: "ReminderPerson",
  };
  const backIcon: IIconProps = { iconName: "Back" };

  // Depending on the login state, the login button is rendered differently
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
    <ActionButton
      iconProps={backIcon}
      className="margin-top1"
      text="Zurück"
      onClick={() => authActions.setDisplayLoginPage(false)}
    />
  ) : (
    loginButton
  );

  return (
    <Stack id="header" horizontal={true} horizontalAlign="end" className="stretch">
      {headerContent}
    </Stack>
  );
}
