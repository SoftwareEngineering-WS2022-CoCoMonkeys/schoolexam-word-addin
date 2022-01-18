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
import { useState } from "react";
import "./BuildButton.scss";
import { ExamStatus } from "../../../import_dto/Exam";
import ExamsRepository from "../services/OnlineExamsRepository";
import RequestStatus from "../state/RequestStatus";
import useExams from "../state/ExamsStore";

export default function BuildButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [examsState, examsActions] = useExams();

  // LOCAL STAT
  // TODO clean state
  const [cleanState, setCleanState] = useState(RequestStatus.IDLE);
  const [dialogVisible, setDialogVisible] = useState(false);

  async function triggerClean() {
    setCleanState(RequestStatus.WAITING);
    await ExamsRepository.clean(examsState.selectedExam.id);
    setCleanState(RequestStatus.SUCCESS);
  }

  const buildDialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: "Kompilieren",
    subText: "Dies kann einige Minuten dauern",
  };

  const cleanButton =
    examsState.selectedExam != null && examsState.selectedExam.status === ExamStatus.SubmissionReady ? (
      <PrimaryButton className="margin-top1" onClick={triggerClean}>
        {cleanState === RequestStatus.WAITING ? <Spinner /> : "Kompilieren"}
      </PrimaryButton>
    ) : (
      ""
    );

  return (
    <div>
      <Dialog
        onDismiss={() => setDialogVisible(false)}
        hidden={!dialogVisible}
        dialogContentProps={buildDialogContentProps}
      >
        <DialogFooter>
          {cleanButton}
          <DefaultButton className="margin-top1" onClick={() => examsActions.build()}>
            {examsState.buildStatus === RequestStatus.WAITING ? <Spinner /> : "Kompilieren"}
          </DefaultButton>
        </DialogFooter>
      </Dialog>
      <PrimaryButton
        id="build-dialog-btn"
        className="margin-right1"
        onClick={() => setDialogVisible(true)}
        disabled={
          (examsState.selectedExam?.status !== ExamStatus.BuildReady &&
            examsState.selectedExam?.status !== ExamStatus.SubmissionReady) ??
          true
        }
        text={examsState.buildStatus !== RequestStatus.WAITING ? "Kompilieren" : ""}
      >
        {examsState.buildStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
      </PrimaryButton>
    </div>
  );
}
