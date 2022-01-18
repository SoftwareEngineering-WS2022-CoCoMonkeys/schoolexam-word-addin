import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import * as React from "react";
import "./ExportButton.scss";
import ExportChecklist from "./ExportChecklist";
import RequestStatus from "../state/RequestStatus";
import { useLoggedIn } from "../state/AuthenticationStore";
import useExams from "../state/ExamsStore";
import useDocument from "../state/DocumentStore";
import { useEffect } from "react";

export default function ExportButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [documentState] = useDocument();
  const [loggedIn] = useLoggedIn();
  const [examsState, examsActions] = useExams();

  const errorDialogContentProps = {
    type: DialogType.normal,
    title: "Export gescheitert",
    subText: "Der Export ist fehlgeschlagen.",
  };

  return (
    <div>
      <Dialog
        hidden={examsState.exportStatus !== RequestStatus.ERROR}
        onDismiss={() => examsActions.setExportStatus(RequestStatus.IDLE)}
        dialogContentProps={errorDialogContentProps}
      >
        <DialogFooter>
          <DefaultButton onClick={() => examsActions.setExportStatus(RequestStatus.IDLE)} text="Ok" />
        </DialogFooter>
      </Dialog>
      <ExportChecklist />
      <PrimaryButton
        id="export-btn"
        disabled={
          !loggedIn || !examsState.taskPdf || !examsState.selectedExam || !documentState.qrCode.bothArePresent()
        }
        onClick={() => examsActions.exportTaskPdf(documentState.taskList.assembleDTO())}
        text={examsState.exportStatus !== RequestStatus.WAITING ? "Dokument exportieren" : ""}
      >
        {examsState.exportStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
      </PrimaryButton>
    </div>
  );
}
