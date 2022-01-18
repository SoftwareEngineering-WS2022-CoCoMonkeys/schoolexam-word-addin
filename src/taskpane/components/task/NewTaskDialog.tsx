import * as React from "react";
import { useState } from "react";
import { DefaultButton, Dialog, DialogFooter, DialogType, TextField } from "@fluentui/react";
import InstructionList from "./NewTaskFromInstructionList";
import { useTasks } from "../state/DocumentStore";

interface NewTaskDialogProps {
  isVisible: boolean;
  setVisible: (boolean) => void;
}

export default function NewTaskDialog(props: NewTaskDialogProps): JSX.Element {
  // GLOBAL STATE
  const [taskList, taskListActions] = useTasks();

  // LOCAL STATE
  const defaultPointsInput = 1;
  const [pointsInput, setPointsInput] = useState(defaultPointsInput);

  function addTask(): void {
    taskListActions.addTask(pointsInput).then(() => props.setVisible(false));
  }

  const newTaskDialogContentProps = {
    type: DialogType.normal,
    title: "Neue Aufgabe",
  };

  return (
    <Dialog
      className="dialog"
      hidden={!props.isVisible}
      onDismiss={() => props.setVisible(false)}
      dialogContentProps={newTaskDialogContentProps}
    >
      <InstructionList />
      <TextField
        required={true}
        label="Punkte"
        type="number"
        defaultValue={defaultPointsInput.toString()}
        onChange={(event) => setPointsInput(parseInt(event.currentTarget.value))}
      />
      <DialogFooter>
        <DefaultButton
          onClick={addTask}
          disabled={pointsInput == null || isNaN(pointsInput) || pointsInput <= 0}
          text="Aufgabe hinzufügen"
        />
      </DialogFooter>
    </Dialog>
  );
}
