import * as React from "react";
import "./Header.scss";
import { ActionButton, IIconProps } from "@fluentui/react";
import BackButton from "../util/BackButton";
import useAuth from "../state/AuthenticationStore";

export default function Header(_props: unknown): JSX.Element {
  const [authState, authActions] = useAuth();

  const userIcon: IIconProps = { iconName: "Contact" };
  const userIconChecked: IIconProps = {
    iconName: "ReminderPerson",
    style: {
      color: "green",
    },
  };

  const loginButton =
    authState.authData != null ? (
      <ActionButton
        id="login-btn-checked"
        className="margin-top1"
        iconProps={userIconChecked}
        text={authState.authData?.user?.username ?? ""}
      />
    ) : (
      <ActionButton
        id="login-btn"
        className="margin-top1"
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
    <div id="header" className="center-items column-flex">
      {headerContent}
    </div>
  );
}
