import { DefaultButton, PrimaryButton } from "@fluentui/react";
import * as React from "react";
import Exam from "../../../model/Exam";
import "./ExportButton.scss";
import PdfService from "../services/PdfService";

export interface IPrepareExportButtonProps {
  exportButtonDisabled?: boolean;
  selectedExam: Exam;
}

export default function ExportButton(_props: any) {
  function exportExam() {
    PdfService.getDocument().then((res) => console.log(_arrayBufferToBase64(res)));
  }

  function _arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    <div>
      <PrimaryButton
        id="export-exam-btn"
        className="margin-btn"
        onClick={exportExam}
        disabled={_props.exportButtonDisabled}
        text="Dokument exportieren"
      />
    </div>
  );
}
