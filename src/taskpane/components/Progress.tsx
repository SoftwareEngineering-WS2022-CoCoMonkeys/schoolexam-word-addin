import * as React from "react";
import { Spinner, SpinnerSize } from "@fluentui/react";

export interface ProgressProps {
  logo: string;
  message: string;
  title: string;
}

export default class Progress extends React.Component<ProgressProps> {
  render() {
    const { logo, message, title } = this.props;

    return (
        <Spinner size={SpinnerSize.large} label={message} />
    );
  }
}
