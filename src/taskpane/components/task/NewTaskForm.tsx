import * as React from "react";
import { useState } from "react";
import { ActionButton, IIconProps, PrimaryButton, Stack, TextField } from "@fluentui/react";
import BackButton from "../util/BackButton";
import TaskList from "../../../model/TaskList";
import "./NewTaskForm.scss";
import InstrutctionList from "./NewTaskFromInstructionList";

export interface NewTaskFormProps {
  taskList: TaskList;
  setTaskList: (taskList: TaskList) => void;
}

export default function NewTaskForm(props: NewTaskFormProps): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const [pointsInput, setPointsInput] = useState(null);

  const addIcon: IIconProps = { iconName: "Add" };

  function addTask(): void {
    props.taskList.addTaskFromSelectionAsync(pointsInput).then((taskList) => {
      props.setTaskList(taskList);
    });
  }

  const expandCollapseBtn = expanded ? (
    <BackButton onBack={() => setExpanded(false)} />
  ) : (
    <ActionButton
      iconProps={addIcon}
      text="Neue Aufgabe"
      id="new-task-btn"
      className="margin-btn"
      onClick={() => setExpanded(true)}
    />
  );

  return (
    <div id="new-task-form" className="center-items">
      {expandCollapseBtn}
      {expanded && (
        <div id="expanded-new-task-form" className="center-items">
          <InstrutctionList />
          <Stack>
            <TextField
              required={true}
              label="Punkte"
              type="number"
              onChange={(event) => setPointsInput(parseInt(event.currentTarget.value))}
            />
            <PrimaryButton
              className="margin-btn"
              onClick={addTask}
              disabled={pointsInput == null || isNaN(pointsInput) || pointsInput <= 0}
            >
              Aufgabe hinzufügen
            </PrimaryButton>
          </Stack>
        </div>
      )}
    </div>
  );
}
