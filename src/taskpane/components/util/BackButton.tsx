import { ActionButton, IIconProps } from "@fluentui/react";
import * as React from "react";

export interface BackButtonProps {
  onBack: (event) => void;
}

export default function BackButton(props: BackButtonProps): JSX.Element {
  const backIcon: IIconProps = { iconName: "Back" };
  return <ActionButton iconProps={backIcon} className="margin-top1" text="Zurück" onClick={props.onBack} />;
}
