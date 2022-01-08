import * as React from "react";
import "./ExportView.scss";
import ExamList from "./ExamList";
import { DefaultButton } from "@fluentui/react";
import PdfService from "./PdfService";
import Exam from "../../../model/Exam";

export interface ExportViewProps {
  selectedExam: Exam;
  setSelectedexam: (exam: Exam) => void;
}

export default function ExportView(props: ExportViewProps): JSX.Element {
  function exportExam() {
    PdfService.getDocument().then((pdf) => {
      console.log(pdf);
    });
  }

  return (
    <div id="export-view">
      <ExamList selectedExam={props.selectedExam} setSelectedExam={props.setSelectedexam} />
      <DefaultButton className="margin-btn" onClick={() => exportExam()} text="Dokument exportieren" />
    </div>
  );
}
