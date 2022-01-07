// @ts-ignore
import * as React from "react";
import "./Header.scss";
import { CommandBarButton, IIconProps } from "@fluentui/react";
import BackButton from "../util/BackButton";

export interface HeaderProps {
  onExpandLogin: () => void;
  onCollapseLogin: () => void;
  loginPageDisplayed: boolean;
}

export default class Header extends React.Component<HeaderProps, any> {
  constructor(props) {
    super(props);
  }

  private readonly userIcon: IIconProps = { iconName: "Contact" };

  render() {
    return (
      <div id="header">
        {this.props.loginPageDisplayed ? (
          <BackButton onBack={this.props.onCollapseLogin} />
        ) : (
          <CommandBarButton
            id="login-btn"
            className="margin-btn"
            iconProps={this.userIcon}
            text="Login"
            onClick={this.props.onExpandLogin}
          />
        )}
      </div>
    );
  }
}
