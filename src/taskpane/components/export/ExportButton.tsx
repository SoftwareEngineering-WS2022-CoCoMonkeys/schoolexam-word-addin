import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import Exam from "../../../word/Exam";
import "./ExportButton.scss";
import TaskList from "../../../word/TaskList";
import ApiService from "../services/ApiService";
import TemplateDTO from "../../../dto/TemplateDTO";

export interface ExportButtonProps {
  selectedExam: Exam | null;
  taskList: TaskList;
  taskPdf: string | null;
}

enum ExportState {
  idle,
  exporting,
  error,
  success,
}

export default function ExportButton(props: ExportButtonProps): JSX.Element {
  const [exportState, setExportState] = useState(ExportState.idle);

  async function exportExam() {
    setExportState(ExportState.exporting);

    // remove and re-insert linkContentControls
    await props.taskList.removeLinkContentControlsAsync();
    await props.taskList.insertLinkContentControlsAsync();

    const exportData = new TemplateDTO(props.taskPdf, props.taskList.assembleDTO());
    try {
      const response = await ApiService.postExamPdf(props.selectedExam.examId, exportData);
      setExportState(ExportState.success);
    } catch (e) {
      setExportState(ExportState.error);
    }
  }

  const errorDialogContentProps = {
    type: DialogType.normal,
    title: "Export gescheitert",
    subText: "Der Export ist fehlgeschlagen",
  };

  return (
    <div>
      <Dialog
        hidden={exportState !== ExportState.error}
        onDismiss={() => setExportState(ExportState.idle)}
        dialogContentProps={errorDialogContentProps}
      >
        <DialogFooter>
          <DefaultButton onClick={() => setExportState(ExportState.idle)} text="Ok" />
        </DialogFooter>
      </Dialog>
      <PrimaryButton
        id="export-btn"
        className="margin-btn stretch"
        disabled={props.selectedExam == null || props.taskPdf == null}
        onClick={exportExam}
      >
        {exportState === ExportState.exporting ? <Spinner /> : "Dokument exportieren"}
      </PrimaryButton>
    </div>
  );
}
