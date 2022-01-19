import * as React from "react";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IDialogContentProps,
  PrimaryButton,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import useSubmissions from "../state/SubmissionsStore";
import RequestStatus, { isErroneousStatus } from "../state/RequestStatus";
import useExams from "../state/ExamsStore";
import TooltipCheckList, { CheckListItem } from "../export/TooltipCheckList";
import { ExamStatus } from "../../../model/Exam";
import { useLoggedIn } from "../state/AuthenticationStore";

/**
 * React component that wraps a button that, when clicked, opens a file input dialog and adds the selected files
 * to the submissions MicroStore ({@link useSubmissions})
 *
 * Some conditions have to be fulfilled before the button can be clicked. These conditions
 * are presented in a {@link TooltipCheckList} format on hover.
 * @component
 */
export default function AddSubmissionButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [submissionsState, submissionsActions] = useSubmissions();
  const [loggedIn] = useLoggedIn();
  const [examsState] = useExams();

  const addSubmissionsCheckList = [
    new CheckListItem(loggedIn, "Eingeloggt"),
    new CheckListItem(examsState.selectedExam != null, "Prüfung ausgewählt"),
    new CheckListItem(
      examsState.selectedExam != null &&
        (examsState.selectedExam.status === ExamStatus.SubmissionReady ||
          examsState.selectedExam.status === ExamStatus.InCorrection ||
          examsState.selectedExam.status === ExamStatus.Corrected),
      'Prüfung ist "Einreichungsbereit", "In Korrektur", oder "Korrigiert"'
    ),
  ];
  /** Wether the button is enabled */
  const checkListFulfilled = addSubmissionsCheckList.map((item) => item.status).reduce((a, b) => a && b);

  const errorDialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: "Hinzufügen gescheitert",
    subText: "Das Hinzufügen von Einreichungen ist fehlgeschlagen.",
  };
  // No success dialog as uploadSubmissions counter is incremented

  const addSubmissionsBtn = (
    <PrimaryButton
      disabled={!checkListFulfilled}
      onClick={() => submissionsActions.addSubmissions(examsState.selectedExam.id)}
      text={submissionsState.addSubmissionsStatus !== RequestStatus.WAITING ? "Einreichung hinzufügen" : null}
    >
      {submissionsState.addSubmissionsStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
    </PrimaryButton>
  );
  return (
    <>
      <Dialog
        className="dialog"
        onDismiss={() => submissionsActions.setAddSubmissionsStatus(RequestStatus.IDLE)}
        hidden={!isErroneousStatus(submissionsState.addSubmissionsStatus)}
        dialogContentProps={errorDialogContentProps}
      >
        <DialogFooter>
          <DialogFooter>
            <DefaultButton onClick={() => submissionsActions.setAddSubmissionsStatus(RequestStatus.IDLE)} text="Ok" />
          </DialogFooter>
        </DialogFooter>
      </Dialog>
      <TooltipCheckList renderChild={addSubmissionsBtn} items={addSubmissionsCheckList} />
    </>
  );
}
