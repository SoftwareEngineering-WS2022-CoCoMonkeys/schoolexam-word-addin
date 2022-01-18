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
import { useId } from "@fluentui/react-hooks";
import TooltipCheckList, { CheckListItem } from "./TooltipCheckList";

export default function BuildButton(_props: unknown): JSX.Element {
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
  const checkListFullfilled = buildCheckList.map((item) => item.condition).reduce((a, b) => a && b);

  const buildDialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: "Kompilation gescheitert",
    subText: "Die Kompilation ist fehlgeschlagen.",
  };

  const buildBtn = (
    <PrimaryButton
      onClick={examsActions.build}
      disabled={!checkListFullfilled}
      text={examsState.buildStatus !== RequestStatus.WAITING ? "Kompilieren" : ""}
    >
      {examsState.buildStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
    </PrimaryButton>
  );

  return (
    <>
      <Dialog
        className="dialog"
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
