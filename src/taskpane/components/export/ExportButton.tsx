import { DefaultButton, PrimaryButton } from "@fluentui/react";
import * as React from "react";
import "./ExportButton.scss";
import PdfService from "./PdfService";

export interface IPrepareExportButtonProps {
    exportButtonDisabled?: boolean;
  }

export default function ExportButton(_props: any) {
  
  function onExport() {
    PdfService.getDocument().then((res) => console.log(res));
  }

  
  return (
    <div>
      <PrimaryButton id="export-exam-btn"className="margin-btn" onClick={onExport} disabled={_props.exportButtonDisabled} text="Dokument exportieren" />
    </div>
  );
}
