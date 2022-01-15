import * as React from "react";
import { useState } from "react";
import { ActionButton, DefaultButton, Dialog, DialogFooter, DialogType, IIconProps, TextField } from "@fluentui/react";
import "./NewTaskForm.scss";
import InstructionList from "./NewTaskFromInstructionList";
import useTasks from "../state/TaskStore";

export default function NewTaskForm(_props: unknown): JSX.Element {
  const [dialogVisible, setDialogVisible] = useState(false);
  const defaultPointsInput = 1;
  const [taskState, taskActions] = useTasks();
  const [pointsInput, setPointsInput] = useState(defaultPointsInput);

  const addIcon: IIconProps = { iconName: "Add" };

  function addTask(): void {
    console.log(taskState);
    taskActions.addTask(pointsInput).then(() => setDialogVisible(false));
  }

  const newTaskDialogContentProps = {
    type: DialogType.normal,
    title: "Neue Aufgabe",
  };

  return (
    <div id="new-task-form" className="center-items column-flex">
      <Dialog
        hidden={!dialogVisible}
        onDismiss={() => setDialogVisible(false)}
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
      <ActionButton
        iconProps={addIcon}
        text="Neue Aufgabe"
        id="new-task-btn"
        className="margin-top1"
        onClick={() => setDialogVisible(true)}
      />
    </div>
  );
}
