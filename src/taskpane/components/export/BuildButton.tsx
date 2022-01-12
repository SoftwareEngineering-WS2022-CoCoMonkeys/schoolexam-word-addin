import { PrimaryButton, Spinner, TextField } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import Exam from "../../../model/Exam";
import ApiService from "../services/ApiService";
import "./BuildButton.scss";

export interface BuildButtonProps {
  selectedExam: Exam | null;
  taskPdf: string | null;
}

export default function BuildButton(props: BuildButtonProps): JSX.Element {
  const [countInput, setCountInput] = useState(null);
  const [waiting, setWating] = useState(false);

  async function triggerBuild() {
    setWating(true);
    await ApiService.triggerBuild(props.selectedExam.examId, countInput);
    setWating(false);
  }

  return (
    <div id="build-container" className="stretch">
      <TextField
        id="count-input"
        required={true}
        label="Punkte"
        type="number"
        disabled={props.taskPdf == null}
        onChange={(event) => setCountInput(parseInt(event.currentTarget.value))}
      />
      <PrimaryButton
        id="build-btn"
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
      </PrimaryButton>
    </div>
  );
}
