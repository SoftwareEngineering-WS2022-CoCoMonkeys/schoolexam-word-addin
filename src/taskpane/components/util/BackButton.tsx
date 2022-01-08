import { ActionButton, CommandBarButton, IIconProps } from "@fluentui/react";
import * as React from "react";

export interface BackButtonProps {
  onBack: (event) => void;
}

export default function BackButton(props: BackButtonProps) {
  const backIcon: IIconProps = { iconName: "Back" };
  return <ActionButton iconProps={backIcon} className="margin-btn" text="Zurück" onClick={props.onBack} />;
}
