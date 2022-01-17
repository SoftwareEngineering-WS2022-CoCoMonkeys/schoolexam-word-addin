import * as React from "react";
import "./Header.scss";
import { ActionButton, IIconProps } from "@fluentui/react";
import BackButton from "../util/BackButton";
import usePrep from "../state/PreparationStore";

export default function Header(_props: unknown): JSX.Element {
  const [prepState, prepActions] = usePrep();

  const userIcon: IIconProps = { iconName: "Contact" };
  const userIconChecked: IIconProps = {
    iconName: "ReminderPerson",
    style: {
      color: "green",
    },
  };

  const loginButton = prepState.loggedIn ? (
    <ActionButton
      id="login-btn-checked"
      className="margin-top1"
      iconProps={userIconChecked}
      text={prepState?.authData?.user?.username ?? ""}
    />
  ) : (
    <ActionButton
      id="login-btn"
      className="margin-top1"
      iconProps={userIcon}
      text="Login"
      onClick={() => prepActions.setDisplayLogin(true)}
    />
  );

  const headerContent = prepState.displayLogin ? (
    <BackButton onBack={() => prepActions.setDisplayLogin(false)} />
  ) : (
    loginButton
  );

  return (
    <div id="header" className="center-items column-flex">
      {headerContent}
    </div>
  );
}
