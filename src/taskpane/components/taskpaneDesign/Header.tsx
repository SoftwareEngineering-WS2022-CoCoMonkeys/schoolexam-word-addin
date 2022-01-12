import * as React from "react";
import "./Header.scss";
import { ActionButton, IIconProps } from "@fluentui/react";
import BackButton from "../util/BackButton";

export interface HeaderProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  setDisplayLogin: (displayLogin: boolean) => void;
  displayLogin: boolean;
}

export default function Header(props: HeaderProps): JSX.Element {
  const userIcon: IIconProps = { iconName: "Contact" };
  const userIconChecked: IIconProps = {
    iconName: "ReminderPerson",
    style: {
      color: "green",
    },
  };

  const loginButton = props.loggedIn ? (
    <ActionButton id="login-btn-checked" className="margin-btn" iconProps={userIconChecked} />
  ) : (
    <ActionButton
      id="login-btn"
      className="margin-btn"
      iconProps={userIcon}
      text="Login"
      onClick={() => props.setDisplayLogin(true)}
    />
  );

  const headerContent = props.displayLogin ? <BackButton onBack={() => props.setDisplayLogin(false)} /> : loginButton;

  return (
    <div id="header" className="center-items">
      {headerContent}
    </div>
  );
}
