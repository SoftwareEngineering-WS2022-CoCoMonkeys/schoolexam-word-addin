import * as React from "react";
import "./Header.scss";
import { CommandBarButton, IIconProps } from "@fluentui/react";
import BackButton from "../util/BackButton";

export interface HeaderProps {
  onExpandLogin: () => void;
  onCollapseLogin: () => void;
  loginPageDisplayed: boolean;
}

export default function Header(props: HeaderProps) {
  const userIcon: IIconProps = { iconName: "Contact" };

  return (
    <div id="header">
      {props.loginPageDisplayed ? (
        <BackButton onBack={props.onCollapseLogin} />
      ) : (
        <CommandBarButton
          id="login-btn"
          className="margin-btn"
          iconProps={userIcon}
          text="Login"
          onClick={props.onExpandLogin}
        />
      )}
    </div>
  );
}
