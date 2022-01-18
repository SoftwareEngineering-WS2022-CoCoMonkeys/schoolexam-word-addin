import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import * as React from "react";
import RequestStatus from "../state/RequestStatus";
import { useLoggedIn } from "../state/AuthenticationStore";
import useExams from "../state/ExamsStore";
import useDocument from "../state/DocumentStore";
import { useId } from "@fluentui/react-hooks";
import { ExamStatus } from "../../../model/Exam";
import TooltipCheckList, { CheckListItem } from "./TooltipCheckList";

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

  const exportCheckList = [
    new CheckListItem(loggedIn, "Eingeloggt"),
    new CheckListItem(examsState.taskPdf != null, "Dokument konvertiert"),
    new CheckListItem(examsState.selectedExam != null, "Prüfung ausgewählt"),
    new CheckListItem(documentState.qrCode.footerIsPresent(), "QR-Code in Fußzeile"),
    new CheckListItem(documentState.qrCode.titleIsPresent(), "QR-Code-(Platzhalter) auf Titelseite"),
    new CheckListItem(
      examsState.selectedExam != null &&
        examsState.selectedExam.status !== ExamStatus.Planned &&
        examsState.selectedExam.status !== ExamStatus.BuildReady &&
        examsState.selectedExam.status !== ExamStatus.SubmissionReady,
      'Prüfung ist "Geplant", "Kompilierbereit" oder "Einreichungsbereit"'
    ),
  ];
  const checkListFullfilled = exportCheckList.map((item) => item.condition).reduce((a, b) => a && b);

  const exportBtn = (
    <PrimaryButton
      disabled={!checkListFullfilled}
      onClick={() => examsActions.exportTaskPdf(documentState.taskList)}
      text={examsState.exportStatus !== RequestStatus.WAITING ? "Dokument exportieren" : ""}
    >
      {examsState.exportStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
    </PrimaryButton>
  );

  return (
    <>
      <Dialog
        className="dialog"
        hidden={examsState.exportStatus !== RequestStatus.ERROR}
        onDismiss={() => examsActions.setExportStatus(RequestStatus.IDLE)}
        dialogContentProps={errorDialogContentProps}
      >
        <DialogFooter>
          <DefaultButton onClick={() => examsActions.setExportStatus(RequestStatus.IDLE)} text="Ok" />
        </DialogFooter>
      </Dialog>
      <TooltipCheckList renderChild={exportBtn} items={exportCheckList} />
    </>
  );
}
