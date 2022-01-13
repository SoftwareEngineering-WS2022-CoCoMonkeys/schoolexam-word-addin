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
import Exam from "../../../word/Exam";
import ApiService from "../services/ApiService";
import "./BuildButton.scss";

export interface BuildButtonProps {
  selectedExam: Exam | null;
  taskPdf: string | null;
}

export default function BuildButton(props: BuildButtonProps): JSX.Element {
  const [countInput, setCountInput] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  async function triggerBuild() {
    setWaiting(true);
    await ApiService.triggerBuild(props.selectedExam.examId, countInput);
    setWaiting(false);
    setDialogVisible(false);
  }

  const buildDialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: "Kompilieren",
    subText: "Wählen Sie die gewünscht Anzahl an Prüfungsexemplaren aus",
  };

  return (
    <div id="build-container" className="center-items stretch">
      <Dialog
        onDismiss={() => setDialogVisible(false)}
        hidden={!dialogVisible}
        dialogContentProps={buildDialogContentProps}
      >
        <TextField
          id="build-count-input"
          required={true}
          label="Exemplare"
          type="number"
          onChange={(event) => setCountInput(parseInt(event.currentTarget.value))}
        />
        <DialogFooter>
          <DefaultButton
            className="margin-btn"
            onClick={triggerBuild}
            disabled={
              props.selectedExam == null ||
              props.taskPdf == null ||
              countInput == null ||
              isNaN(countInput) ||
              countInput <= 0
            }
          >
            {waiting ? <Spinner /> : "Kompilieren"}
          </DefaultButton>
        </DialogFooter>
      </Dialog>
      <PrimaryButton
        id="build-dialog-btn"
        className="margin-btn"
        onClick={() => setDialogVisible(true)}
        disabled={props.taskPdf == null}
      >
        {waiting ? <Spinner /> : "Kompilieren"}
      </PrimaryButton>
    </div>
  );
}
