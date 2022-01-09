import * as React from "react";
import { ActionButton, CommandBarButton, DetailsList, DetailsListLayoutMode, IIconProps, PrimaryButton, Stack, Text, TextField } from "@fluentui/react";
import BackButton from "../util/BackButton";
import { useState } from "react";
import TaskList from "../../../model/TaskList";
import { InstrutctionList } from "./NewTaskFromInstructionList";

export interface NewTaskFormProps {
  taskList: TaskList;
  setTaskList: (taskList: TaskList) => void;
}

export default function NewTaskForm(props: NewTaskFormProps) {
  const [expanded, setExpanded] = useState(false);
  const [pointsInput, setPointsInput] = useState(null);

  const addIcon: IIconProps = { iconName: "Add" };

  function addTask(): void {
    props.taskList.addTaskFromSelection(pointsInput).then((taskList) => {
      props.setTaskList(taskList);
    });
  }
  
  return (
    <div>
      {expanded ? (
        <div>
          <BackButton onBack={() => setExpanded(false)} />
          <InstrutctionList />
          <Stack>
            <TextField
              label="Punkte"
              type="number"
              onChange={(event) => setPointsInput(parseInt(event.currentTarget.value))}
            />
            <PrimaryButton className="margin-btn" onClick={addTask}>
              Aufgabe hinzufügen
            </PrimaryButton>
          </Stack>
        </div>
      ) : (
        <ActionButton
          iconProps={addIcon}
          text="Neue Aufgabe"
          className="margin-btn"
          onClick={() => setExpanded(true)}
        />
      )}
    </div>
  );
}
