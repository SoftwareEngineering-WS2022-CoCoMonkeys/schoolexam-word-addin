import * as React from "react";
import { Spinner, SpinnerSize } from "@fluentui/react";

export interface ProgressProps {
  logo: string;
  message: string;
  title: string;
}

export default function Progress(props: ProgressProps): JSX.Element {
  return <Spinner size={SpinnerSize.large} label={props.message} />;
}
