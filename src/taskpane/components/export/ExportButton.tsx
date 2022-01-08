import { DefaultButton, PrimaryButton } from "@fluentui/react";
import * as React from "react";
import Exam from "../../../model/Exam";
import "./ExportButton.scss";
import PdfService from "./PdfService";

export interface IPrepareExportButtonProps {
    exportButtonDisabled?: boolean;
    selectedExam: Exam;
  }

export default function ExportButton(_props: any) {
  
  function exportExam() {
    PdfService.getDocument().then((res) => console.log(res));
  }
  
  return (
    <div>
      <PrimaryButton id="export-exam-btn"className="margin-btn" onClick={exportExam} disabled={_props.exportButtonDisabled} text="Dokument exportieren" />
    </div>
  );
}
