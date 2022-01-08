import { DefaultButton } from "@fluentui/react";
import * as React from "react";
import "./ExportButton.scss";
import PdfService from "./PdfService";

export default function ExportButton(_props: any) {
  function onExport() {
    PdfService.getDocument().then((res) => console.log(res));
  }

  return (
    <div id="export-exam-btn">
      <DefaultButton className="margin-btn" onClick={onExport} text="Dokument exportieren" />
    </div>
  );
}
