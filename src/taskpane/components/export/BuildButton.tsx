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
import "./BuildButton.scss";
import { ExamStatus } from "../../../model/Exam";
import RequestStatus from "../state/RequestStatus";
import useExams from "../state/ExamsStore";
import { useLoggedIn } from "../state/AuthenticationStore";

export default function BuildButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [examsState, examsActions] = useExams();
  const [loggedIn] = useLoggedIn();

  const buildDialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: "Kompilation gescheitert",
    subText: "Die Kompilation ist fehlgeschlagen.",
  };

  return (
    <div>
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
      <PrimaryButton
        id="build-dialog-btn"
        className="margin-right1"
        onClick={examsActions.build}
        disabled={
          (!loggedIn ||
            (examsState.selectedExam?.status !== ExamStatus.BuildReady &&
              examsState.selectedExam?.status !== ExamStatus.SubmissionReady)) ??
          true
        }
        text={examsState.buildStatus !== RequestStatus.WAITING ? "Kompilieren" : ""}
      >
        {examsState.buildStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
      </PrimaryButton>
    </div>
  );
}
