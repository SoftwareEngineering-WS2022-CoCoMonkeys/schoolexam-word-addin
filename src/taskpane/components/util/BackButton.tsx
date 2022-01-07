import { CommandBarButton, IIconProps } from "@fluentui/react";
import * as React from "react";

export interface BackButtonProps {
  onBack: (event) => void;
}

export default class BackButton extends React.Component<BackButtonProps, any> {
  constructor(props) {
    super(props);
  }

  private readonly backIcon: IIconProps = { iconName: "Back" };

  render() {
    return (
      <CommandBarButton iconProps={this.backIcon} className="margin-btn" text="Zurück" onClick={this.props.onBack} />
    );
  }
}
