import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import * as React from "react";
import RequestStatus, { isErroneousStatus } from "../state/RequestStatus";
import { useLoggedIn } from "../state/AuthenticationStore";
import useExams from "../state/ExamsStore";
import useDocument from "../state/DocumentStore";
import { ExamStatus } from "../../../model/Exam";
import TooltipCheckList, { CheckListItem } from "./TooltipCheckList";

/**
 * React component that wraps a button that, when clicked, uploads the latest {@link IExamsState.taskPdf}
 * of the open Word document as the task pdf for the exam selected in {@link IExamsState.selectedExam} via the exams
 * MicroStore(see {@link useExams}).
 * Several conditions have to be fulfilled before the button can be clicked. These conditions
 * are presented in a {@link TooltipCheckList} format on hover.
 * If the export fails for whatever reason, an error dialog is displayed.
 * @component
 */
export default function ExportButton(): JSX.Element {
  // GLOBAL STATE
  const [documentState] = useDocument();
  const [loggedIn] = useLoggedIn();
  const [examsState, examsActions] = useExams();

  const exportCheckList = [
    new CheckListItem(loggedIn, "Eingeloggt"),
    new CheckListItem(examsState.taskPdf != null, "Dokument konvertiert"),
    new CheckListItem(examsState.selectedExam != null, "Prüfung ausgewählt"),
    new CheckListItem(documentState.qrCode.footerIsPresent(), "QR-Code in Fußzeile"),
    new CheckListItem(documentState.qrCode.titleIsPresent(), "QR-Code-(Platzhalter) auf Titelseite"),
    new CheckListItem(
      examsState.selectedExam != null &&
        (examsState.selectedExam.status === ExamStatus.Planned ||
          examsState.selectedExam.status === ExamStatus.BuildReady ||
          examsState.selectedExam.status === ExamStatus.SubmissionReady),
      'Prüfung ist "Geplant", "Kompilierbereit" oder "Einreichungsbereit"'
    ),
  ];

  /** Whether the button is enabled */
  const checkListFulfilled = exportCheckList.map((item) => item.status).reduce((a, b) => a && b);

  const errorDialogContentProps = {
    type: DialogType.normal,
    title: "Export gescheitert",
    subText: "Der Export ist fehlgeschlagen.",
  };
  const successDialogContentProps = {
    type: DialogType.normal,
    title: "Export erfolgreich",
    subText: "Der Export war erfolgreich.",
  };

  const exportBtn = (
    <PrimaryButton
      disabled={!checkListFulfilled}
      onClick={() => examsActions.exportTaskPdf(documentState.taskList)}
      text={examsState.exportStatus !== RequestStatus.WAITING ? "PDF exportieren" : ""}
    >
      {examsState.exportStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
    </PrimaryButton>
  );

  return (
    <>
      <Dialog
        hidden={!isErroneousStatus(examsState.exportStatus) && examsState.exportStatus !== RequestStatus.SUCCESS}
        onDismiss={() => examsActions.setExportStatus(RequestStatus.IDLE)}
        dialogContentProps={
          examsState.exportStatus === RequestStatus.ERROR ? errorDialogContentProps : successDialogContentProps
        }
      >
        <DialogFooter>
          <DefaultButton onClick={() => examsActions.setExportStatus(RequestStatus.IDLE)} text="Ok" />
        </DialogFooter>
      </Dialog>
      <TooltipCheckList renderChild={exportBtn} items={exportCheckList} />
    </>
  );
}
