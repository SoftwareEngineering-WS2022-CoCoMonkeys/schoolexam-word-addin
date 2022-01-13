import * as React from "react";
import { useState } from "react";
import { ActionButton, DefaultButton, Dialog, DialogFooter, DialogType, IIconProps, TextField } from "@fluentui/react";
import TaskList from "../../../word/TaskList";
import "./NewTaskForm.scss";
import InstructionList from "./NewTaskFromInstructionList";

export interface NewTaskFormProps {
  taskList: TaskList;
  setTaskList: (taskList: TaskList) => void;
}

export default function NewTaskForm(props: NewTaskFormProps): JSX.Element {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [pointsInput, setPointsInput] = useState(null);

  const addIcon: IIconProps = { iconName: "Add" };

  function addTask(): void {
    props.taskList.addTaskFromSelectionAsync(pointsInput).then((taskList) => {
      props.setTaskList(taskList);
      setDialogVisible(false);
    });
  }

  const newTaskDialogContentProps = {
    type: DialogType.normal,
    title: "Neue Aufgabe",
  };

  return (
    <div id="new-task-form" className="center-items">
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
        className="margin-btn"
        onClick={() => setDialogVisible(true)}
      />
    </div>
  );
}
