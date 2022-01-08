import * as React from "react";
import { useState } from "react";
import {
  CommandBarButton,
  DetailsList,
  IColumn,
  IDetailsCheckboxProps,
  IDetailsRowProps,
  IIconProps,
  IRenderFunction,
  SelectionMode,
  TextField,
} from "@fluentui/react";
import TaskList from "../../../model/TaskList";
import "./TaskTable.scss";
import { Task } from "../../../model/Task";

export interface TaskTableProps {
  taskList: TaskList;
  editTask: (taskid: string, fieldName: string, newValue: any) => void;
}

export interface ActiveEdit {
  taskId: string;
  fieldName: string;
}

export default function TaskTable(props: TaskTableProps) {
  const [activeEdit, setActiveEdit] = useState(null as ActiveEdit);

  function editableColumnRenderer(fieldName: string) {
    const editableColumnTextField = (task: Task) => {
      if (activeEdit && activeEdit.taskId === task.taskId && fieldName === activeEdit.fieldName) {
        return (
          <TextField
            defaultValue={task[fieldName]}
            onKeyPress={(event) => {
              if (event.key == "Enter") {
                event.preventDefault();
                props.editTask(task.taskId, fieldName, event.currentTarget.value);
                setActiveEdit(null);
              }
            }}
          />
        );
      } else {
        return <div onDoubleClick={() => setActiveEdit({ taskId: task.taskId, fieldName })}>{task[fieldName]}</div>;
      }
    };
    return editableColumnTextField;
  }

  function renderCheckbox(_task: Task) {
    const editIcon: IIconProps = { iconName: "Edit" };
    const deleteIcon: IIconProps = { iconName: "Delete" };
    return (
      <div className="detail-hover-container">
        <CommandBarButton className="detail-edit-btn row-btn" iconProps={editIcon}></CommandBarButton>
        <CommandBarButton className="detail-delete-btn row-btn" iconProps={deleteIcon}></CommandBarButton>
      </div>
    );
  }

  const columns: IColumn[] = [
    {
      key: "idColumn",
      name: "Aufgaben-ID",
      fieldName: "taskId",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: editableColumnRenderer("taskId"),
    },
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
      name: "Maximalpunktzahl",
      fieldName: "maxPoints",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: editableColumnRenderer("maxPoints"),
    },
  ];

  return (
    <div>
      <DetailsList selectionMode={SelectionMode.none} columns={columns} items={props.taskList.tasks} />
    </div>
  );
}
