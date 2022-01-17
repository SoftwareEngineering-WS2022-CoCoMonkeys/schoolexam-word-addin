import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import "./ExportButton.scss";
import TemplateDTO from "../../../export_dto/TemplateDTO";
import useTasks from "../state/TaskStore";
import usePrep from "../state/PreparationStore";
import Status from "../state/CompletionStatus";
import ExamsRepository from "../services/OnlineExamsRepository";
import ExportChecklist from "./ExportChecklist";
import RequestStatus from "../state/RequestStatus";

export default function ExportButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [taskState] = useTasks();
  const [prepState] = usePrep();

  // LOCAL STATE
  const [exportStatus, setExportStatus] = useState(RequestStatus.IDLE);

  async function exportExam() {
    setExportStatus(RequestStatus.WAITING);

    // remove and re-insert linkContentControls
    await taskState.taskList.removeLinkContentControlsAsync();
    await taskState.taskList.insertLinkContentControlsAsync();

    const exportData = new TemplateDTO(prepState.taskPdf, taskState.taskList.assembleDTO());
    try {
      await ExamsRepository.setTaskPdf(prepState.selectedExam.id, exportData);
      setExportStatus(RequestStatus.SUCCESS);

      // TODO reload exams
    } catch (e) {
      console.warn("Export failed with reason", e);
      setExportStatus(RequestStatus.ERROR);
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
        hidden={exportStatus !== RequestStatus.ERROR}
        onDismiss={() => setExportStatus(RequestStatus.IDLE)}
        dialogContentProps={errorDialogContentProps}
      >
        <DialogFooter>
          <DefaultButton onClick={() => setExportStatus(RequestStatus.IDLE)} text="Ok" />
        </DialogFooter>
      </Dialog>
      <ExportChecklist></ExportChecklist>
      <PrimaryButton id="export-btn" disabled={!Status(prepState).isExportReady()} onClick={exportExam}>
        {exportStatus === RequestStatus.WAITING ? <Spinner /> : "Dokument exportieren"}
      </PrimaryButton>
    </div>
  );
}
