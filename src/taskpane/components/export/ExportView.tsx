import * as React from "react";
import "./ExportView.scss";
import ExamList from "./ExamList";
import { DefaultButton } from "@fluentui/react";
import PdfService from "./PdfService";
import Exam from "../../../model/Exam";
import PrepareExportButton from "./PrepareExportButton";
import ExportButton from "./ExportButton";

export interface ExportViewProps {
  selectedExam: Exam;
  setSelectedexam: (exam: Exam) => void;
}

export default function ExportView(props: ExportViewProps) {
  const [exportButtonDisabled, setExportButtonDisabled] = React.useState(true);


  return (
    <div id="export-view">
      <ExamList selectedExam={props.selectedExam} setSelectedExam={props.setSelectedexam} />
      <PrepareExportButton 
        exportButtonDisabled={exportButtonDisabled}
        setExportButtonDisabled={setExportButtonDisabled}/>
      <ExportButton 
        exportButtonDisabled={exportButtonDisabled}
        selectedExam={props.selectedExam}/>
    </div>
  );
}
