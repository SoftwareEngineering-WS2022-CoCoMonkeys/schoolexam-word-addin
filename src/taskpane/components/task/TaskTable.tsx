import * as React from "react";
import { useState } from "react";
import {
  ActionButton,
  DetailsList,
  IColumn,
  IconButton,
  IDetailsCheckboxProps,
  IDetailsRowProps,
  IIconProps,
  IRenderFunction,
  SelectionMode,
  TextField,
  Toggle,
} from "@fluentui/react";
import "./TaskTable.scss";
import Task from "../../../word/Task";
import { useTasks } from "../state/DocumentStore";

export interface ActiveEdit {
  taskId: string;
  fieldName: string;
}

export default function TaskTable(_props: unknown): JSX.Element {
  const [taskList, taskListActions] = useTasks();
  const [activeEdit, setActiveEdit] = useState(null as ActiveEdit);
  const [deleteMode, setDeleteMode] = useState(false);

  function editTask(taskId: string, fieldName: string, newValue: string | number): void {
    taskListActions.editTask(taskId, fieldName, newValue);
  }

  function updateTaskTitles() {
    taskListActions.updateTaskTitles();
  }

  function editableColumnRenderer(fieldName: string) {
    // eslint-disable-next-line react/display-name
    return (task: Task) => {
      function setActiveEditOnEnter(event) {
        if (event.key == "Enter") {
          event.preventDefault();
          editTask(task.taskId, fieldName, event.currentTarget.value);
          setActiveEdit(null);
        }
      }

      if (activeEdit && activeEdit.taskId === task.taskId && fieldName === activeEdit.fieldName) {
        return <TextField defaultValue={task[fieldName]} onKeyPress={setActiveEditOnEnter} />;
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

  const deleteIcon: IIconProps = {
    iconName: "Delete",
    color: "red",
  };

  function rowCheckBoxRenderer(task: Task): IRenderFunction<IDetailsCheckboxProps> {
    // don't actually render the component, instead return a render function
    const renderCheckBox = () => <IconButton iconProps={deleteIcon} onClick={() => taskListActions.deleteTask(task)} />;
    return renderCheckBox;
  }

  const columns: IColumn[] = [
    {
      key: "titleColumn",
      name: "Titel",
      fieldName: "title",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
      onRender: editableColumnRenderer("title"),
    },
    {
      key: "maxPointsColumn",
      name: "Max. Punktzahl",
      fieldName: "maxPoints",
      minWidth: 100,
      maxWidth: 100,
      isResizable: true,
      onRender: editableColumnRenderer("maxPoints"),
    },
  ];

  const updateIcon: IIconProps = {
    iconName: "Refresh",
  };

  function renderRow(rowProps: IDetailsRowProps, defaultRender?: IRenderFunction<IDetailsRowProps>): JSX.Element {
    rowProps.onRenderDetailsCheckbox = rowCheckBoxRenderer(rowProps.item);
    return defaultRender(rowProps);
  }

  return (
    <div id="task-table-container">
      <Toggle label="Löschen" onChange={(_event, checked) => setDeleteMode(checked ?? false)} />
      <DetailsList
        selectionMode={deleteMode ? SelectionMode.multiple : SelectionMode.none}
        columns={columns}
        items={taskList.tasks}
        onRenderRow={renderRow}
      />
      <ActionButton iconProps={updateIcon} onClick={updateTaskTitles}>
        Reihenfolge zurücksetzen
      </ActionButton>
    </div>
  );
}
