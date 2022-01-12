import { PrimaryButton } from "@fluentui/react";
import * as React from "react";
import Exam from "../../../model/Exam";
import "./ExportButton.scss";
import PdfService from "../services/PdfService";
import TaskList from "../../../model/TaskList";
import TemplateDTO from "../../../dto/TemplateDTO";
import ApiService from "../services/ApiService";

export interface ExportButtonProps {
  selectedExam: Exam;
  taskList: TaskList;
}

export default function ExportButton(props: ExportButtonProps): JSX.Element {
  async function exportExam() {
    // remove and re-insert linkContentControls
    await props.taskList.removeLinkContentControlsAsync();
    await props.taskList.insertLinkContentControlsAsync();

    // get pdf and export
    const pdfBase64: string = await PdfService.getDocument();
    // assemble DTO
    const exportData = new TemplateDTO(pdfBase64, props.taskList.assembleDTO());
    await ApiService.postExamPdf(props.selectedExam.examId, exportData);

    // remove link content controls
    await props.taskList.removeLinkContentControlsAsync();
  }

  return (
    <div>
      <PrimaryButton
        id="export-exam-btn"
        className="margin-btn"
        disabled={props.selectedExam == null}
        onClick={exportExam}
        text="Dokument exportieren"
      />
    </div>
  );
}
