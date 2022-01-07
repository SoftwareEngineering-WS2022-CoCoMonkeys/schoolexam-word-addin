import { DefaultButton } from "@fluentui/react";
import * as React from "react";
import "./ExportButton.scss";
import AuthService from "../login/AuthService";
import PdfService from "./PdfService";
export default class ExportButton extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  onExport = () => {
    PdfService.getDocument().then((res) => console.log(res));
  };

  render() {
    return (
      <div id="export-exam-btn">
        <DefaultButton className="margin-btn" onClick={this.onExport} text="Dokument exportieren" />
      </div>
    );
  }
}
