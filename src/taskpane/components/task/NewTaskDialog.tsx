import * as React from "react";
import { useState } from "react";
import { DefaultButton, Dialog, DialogFooter, DialogType, TextField } from "@fluentui/react";
import InstructionList from "./NewTaskFromInstructionList";
import { useTasks } from "../state/DocumentStore";

/**
 * Properties for {@link NewTaskDialog}
 */
interface NewTaskDialogProps {
  /** Wether the dialog is visible at all */
  isVisible: boolean;
  /** Set if the dialog is visible */
  setVisible: (boolean) => void;
}

/**
 * A dialog that gives instructions for the creation of a new {@link ITask} in the document.
 * Also handles the input of the maximum points for the new task.
 * @component
 */
export default function NewTaskDialog(props: NewTaskDialogProps): JSX.Element {
  // GLOBAL STATE
  const [, taskListActions] = useTasks();

  // LOCAL STATE
  const defaultPointsInput = 1;
  const [pointsInput, setPointsInput] = useState(defaultPointsInput);

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
          onClick={() => taskListActions.addTask(pointsInput).then(() => props.setVisible(false))}
          disabled={pointsInput == null || isNaN(pointsInput) || pointsInput <= 0}
          text="Aufgabe hinzufügen"
        />
      </DialogFooter>
    </Dialog>
  );
}
