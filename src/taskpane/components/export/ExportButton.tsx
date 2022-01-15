import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import "./ExportButton.scss";
import ApiService from "../services/ApiService";
import TemplateDTO from "../../../export_dto/TemplateDTO";
import useTasks from "../state/TaskStore";
import usePrep from "../state/PreparationStore";
import Status from "../state/CompletionStatus";

enum ExportState {
  idle,
  waiting,
  error,
  success,
}

export default function ExportButton(_props: unknown): JSX.Element {
  const [exportState, setExportState] = useState(ExportState.idle);
  const [taskState] = useTasks();
  const [prepState] = usePrep();

  async function exportExam() {
    setExportState(ExportState.waiting);

    // remove and re-insert linkContentControls
    await taskState.taskList.removeLinkContentControlsAsync();
    await taskState.taskList.insertLinkContentControlsAsync();

    const exportData = new TemplateDTO(prepState.taskPdf, taskState.taskList.assembleDTO());
    try {
      await ApiService.postExamPdf(prepState.selectedExam.id, exportData);
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
      <PrimaryButton id="export-btn" disabled={!Status(prepState).isExportReady()} onClick={exportExam}>
        {exportState === ExportState.waiting ? <Spinner /> : "Dokument exportieren"}
      </PrimaryButton>
    </div>
  );
}
