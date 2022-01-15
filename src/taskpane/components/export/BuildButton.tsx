import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IDialogContentProps,
  PrimaryButton,
  Spinner,
  TextField,
} from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import ApiService from "../services/ApiService";
import "./BuildButton.scss";
import usePrep from "../state/PreparationStore";
import Status from "../state/CompletionStatus";

enum BuildState {
  idle,
  waiting,
  error,
  success,
}

export default function BuildButton(_props: unknown): JSX.Element {
  const [buildState, setBuildState] = useState(BuildState.idle);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [prepState, prepActions] = usePrep();

  async function triggerBuild() {
    setBuildState(BuildState.waiting);
    const build = await ApiService.getBuild(prepState.selectedExam.id);
    prepActions.setBuild(build);
    setBuildState(BuildState.success);
    setDialogVisible(false);
  }

  const buildDialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: "Kompilieren",
    subText: "Dies kann einige Minuten dauern",
  };

  return (
    <div>
      <Dialog
        onDismiss={() => setDialogVisible(false)}
        hidden={!dialogVisible}
        dialogContentProps={buildDialogContentProps}
      >
        <DialogFooter>
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
