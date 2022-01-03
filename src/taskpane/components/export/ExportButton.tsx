import { DefaultButton } from "@fluentui/react";
// @ts-ignore
import * as React from "react";
import "./ExportButton.scss";

export default class ExportButton extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="exportExamButton">
        <DefaultButton text="Dokument exportieren" />
      </div>
    );
  }
}
