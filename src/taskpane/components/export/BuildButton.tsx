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
import * as React from "react";
import { ExamStatus } from "../../../model/Exam";
import RequestStatus from "../state/RequestStatus";
import useExams from "../state/ExamsStore";
import { useLoggedIn } from "../state/AuthenticationStore";
import TooltipCheckList, { CheckListItem } from "./TooltipCheckList";

/**
 * React component that wraps a button that, when clicked, triggers the build of the
 * {@link IExamsState.selectedExam} via the exams MicroStore
 * ({@link useExams}). Several conditions have to be fulfilled before the button can be clicked. These conditions
 * are presented in a {@link TooltipCheckList} format on hover.
 * If the build fails for whatever reason, an error dialog is displayed.
 * @component
 */
export default function BuildButton(): JSX.Element {
  // GLOBAL STATE
  const [examsState, examsActions] = useExams();
  const [loggedIn] = useLoggedIn();

  const buildCheckList = [
    new CheckListItem(loggedIn, "Eingeloggt"),
    new CheckListItem(examsState.selectedExam != null, "Prüfung ausgewählt"),
    new CheckListItem(
      examsState.selectedExam != null &&
        examsState.selectedExam.status !== ExamStatus.BuildReady &&
        examsState.selectedExam.status !== ExamStatus.SubmissionReady,
      'Prüfung ist "Kompilierbereit" oder "Einreichungsbereit"'
    ),
  ];
  /** Whether the button is enabled */
  const checkListFulfilled = buildCheckList.map((item) => item.status).reduce((a, b) => a && b);

  const buildDialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: "Kompilation gescheitert",
    subText: "Die Kompilation ist fehlgeschlagen.",
  };

  const buildBtn = (
    <PrimaryButton
      onClick={examsActions.build}
      disabled={!checkListFulfilled}
      text={examsState.buildStatus !== RequestStatus.WAITING ? "Kompilieren" : ""}
    >
      {examsState.buildStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
    </PrimaryButton>
  );

  return (
    <>
      <Dialog
        onDismiss={() => examsActions.setBuildStatus(RequestStatus.IDLE)}
        hidden={examsState.buildStatus !== RequestStatus.ERROR}
        dialogContentProps={buildDialogContentProps}
      >
        <DialogFooter>
          <DialogFooter>
            <DefaultButton onClick={() => examsActions.setBuildStatus(RequestStatus.IDLE)} text="Ok" />
          </DialogFooter>
        </DialogFooter>
      </Dialog>
      <TooltipCheckList renderChild={buildBtn} items={buildCheckList} />
    </>
  );
}
