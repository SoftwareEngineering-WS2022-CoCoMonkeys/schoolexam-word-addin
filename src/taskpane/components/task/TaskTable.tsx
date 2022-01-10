import * as React from "react";
import { useState } from "react";
import { ActionButton, DetailsList, IColumn, IIconProps, SelectionMode, TextField } from "@fluentui/react";
import TaskList from "../../../model/TaskList";
import "./TaskTable.scss";
import { Task } from "../../../model/Task";

export interface TaskTableProps {
  taskList: TaskList;
  setTaskList: (taskList: TaskList) => void;
}

export interface ActiveEdit {
  taskId: string;
  fieldName: string;
}

export default function TaskTable(props: TaskTableProps) {
  const [activeEdit, setActiveEdit] = useState(null as ActiveEdit);

  function editableColumnRenderer(fieldName: string) {
    return (task: Task) => {
      if (activeEdit && activeEdit.taskId === task.taskId && fieldName === activeEdit.fieldName) {
        return (
          <TextField
            defaultValue={task[fieldName]}
            onKeyPress={(event) => {
              if (event.key == "Enter") {
                event.preventDefault();
                editTask(task.taskId, fieldName, event.currentTarget.value);
                setActiveEdit(null);
              }
            }}
          />
        );
      } else {
        return (
          <div
            onClick={() => task.jumpToAsync()}
            onDoubleClick={() => setActiveEdit({ taskId: task.taskId, fieldName })}
          >
            {task[fieldName]}
          </div>
        );
      }
    };
  }

  function renderCheckbox(_task: Task) {
    const editIcon: IIconProps = { iconName: "Edit" };
    const deleteIcon: IIconProps = { iconName: "Delete" };
    return (
      <div className="detail-hover-container">
        <ActionButton className="detail-edit-btn row-btn" iconProps={editIcon}></ActionButton>
        <ActionButton className="detail-delete-btn row-btn" iconProps={deleteIcon}></ActionButton>
      </div>
    );
  }

  const columns: IColumn[] = [
    {
      key: "titleColumn",
      name: "Titel",
      fieldName: "title",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: editableColumnRenderer("title"),
    },
    {
      key: "maxPointsColumn",
      name: "Max. Punktzahl",
      fieldName: "maxPoints",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: editableColumnRenderer("maxPoints"),
    },
  ];

  function editTask(taskId: string, fieldName: string, newValue: any): void {
    props.taskList.editTaskAsync(taskId, fieldName, newValue).then((taskList) => {
      props.setTaskList(taskList);
    });
  }

  function updateTasks() {
    props.taskList.updateTaskTitlesAsync().then((taskList) => props.setTaskList(taskList));
  }

  const updateIcon: IIconProps = {
    iconName: "Refresh",
  };

  return (
    <div id="task-table-container">
      <DetailsList selectionMode={SelectionMode.none} columns={columns} items={props.taskList.tasks} />
      <ActionButton iconProps={updateIcon} onClick={updateTasks}>
        Reihenfolge zurücksetzen
      </ActionButton>
    </div>
  );
}
