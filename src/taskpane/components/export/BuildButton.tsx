import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IDialogContentProps,
  PrimaryButton,
  Spinner,
} from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import "./BuildButton.scss";
import usePrep from "../state/PreparationStore";
import Status from "../state/CompletionStatus";
import { ExamStatus } from "../../../import_dto/Exam";
import ExamsRepository from "../services/OnlineExamsRepository";

enum BuildState {
  idle,
  waiting,
  error,
  success,
}

enum CleanState {
  idle,
  waiting,
  error,
  success,
}

export default function BuildButton(_props: unknown): JSX.Element {
  const [buildState, setBuildState] = useState(BuildState.idle);
  const [cleanState, setCleanState] = useState(CleanState.idle);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [prepState, prepActions] = usePrep();

  async function triggerBuild() {
    setBuildState(BuildState.waiting);
    const build = await ExamsRepository.getBuild(prepState.selectedExam.id);
    prepActions.setBuild(build);
    setBuildState(BuildState.success);
    setDialogVisible(false);
  }

  async function triggerClean() {
    setCleanState(CleanState.waiting);
    await ExamsRepository.clean(prepState.selectedExam.id);
    setCleanState(CleanState.success);
  }

  const buildDialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: "Kompilieren",
    subText: "Dies kann einige Minuten dauern",
  };

  const cleanButton =
    prepState.selectedExam != null && prepState.selectedExam.status === ExamStatus.SubmissionReady ? (
      <PrimaryButton className="margin-top1" onClick={triggerClean}>
        {cleanState === CleanState.waiting ? <Spinner /> : "Kompilieren"}
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
          <DefaultButton className="margin-top1" onClick={triggerBuild}>
            {buildState === BuildState.waiting ? <Spinner /> : "Kompilieren"}
          </DefaultButton>
        </DialogFooter>
      </Dialog>
      <PrimaryButton
        id="build-dialog-btn"
        className="margin-right1"
        onClick={() => setDialogVisible(true)}
        disabled={!Status(prepState).isBuildReady()}
      >
        {buildState === BuildState.waiting ? <Spinner /> : "Kompilieren"}
      </PrimaryButton>
    </div>
  );
}
