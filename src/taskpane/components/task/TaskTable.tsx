import * as React from "react";
import { useState } from "react";
import {
  CommandBarButton,
  DetailsList,
  IColumn,
  IconButton,
  IDetailsCheckboxProps,
  IDetailsRowProps,
  IIconProps,
  IRenderFunction,
  SelectionMode,
  Stack,
  TextField,
} from "@fluentui/react";
import Task from "../../../word/Task";
import { useTasks } from "../state/DocumentStore";
import NewTaskDialog from "./NewTaskDialog";

export interface ActiveEdit {
  id: string;
  fieldName: string;
}

export default function TaskTable(_props: unknown): JSX.Element {
  const [taskList, taskListActions] = useTasks();

  const [activeEdit, setActiveEdit] = useState(null as ActiveEdit);
  const [deleteMode, setDeleteMode] = useState(false);
  const [newTaskDialogVisible, setNewTaskDialogVisible] = useState(false);

  function editableColumnRenderer(fieldName: string) {
    // eslint-disable-next-line react/display-name
    return (task: Task) => {
      function setActiveEditOnEnter(event) {
        if (event.key == "Enter") {
          event.preventDefault();
          taskListActions.editTask(task.id, fieldName, event.currentTarget.value);
          setActiveEdit(null);
        }
      }

      if (activeEdit && activeEdit.id === task.id && fieldName === activeEdit.fieldName) {
        return <TextField defaultValue={task[fieldName]} onKeyPress={setActiveEditOnEnter} />;
      } else {
        return (
          <div onClick={() => task.jumpToAsync()} onDoubleClick={() => setActiveEdit({ id: task.id, fieldName })}>
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
      flexGrow: 3,
      onRender: editableColumnRenderer("title"),
    },
    {
      key: "maxPointsColumn",
      name: "Max. Punkte",
      fieldName: "maxPoints",
      minWidth: 100,
      maxWidth: 100,
      flexGrow: 1,
      isResizable: true,
      onRender: editableColumnRenderer("maxPoints"),
    },
  ];

  function renderRow(rowProps: IDetailsRowProps, defaultRender?: IRenderFunction<IDetailsRowProps>): JSX.Element {
    rowProps.onRenderDetailsCheckbox = rowCheckBoxRenderer(rowProps.item);
    return defaultRender(rowProps);
  }

  return (
    <>
      {/* We could not use a CommandBar here because the overflow behaviour was very glitchy.
       Instead, we simulate a CommandBar with a horizontal Stack and CommandBarButtons*/}
      <Stack horizontal={true} styles={{ root: { height: 44 } }}>
        <CommandBarButton
          text="Neue Aufgabe"
          onClick={() => setNewTaskDialogVisible(true)}
          iconProps={{ iconName: "Add" }}
        />
        <CommandBarButton
          toggle={true}
          checked={deleteMode}
          text="Löschen"
          onClick={() => setDeleteMode(!deleteMode)}
          iconProps={{ iconName: "Delete" }}
        />
        <CommandBarButton
          text="Reihenfolge zurücksetzen"
          onClick={() => taskListActions.updateTaskTitles()}
          iconProps={{ iconName: "Refresh" }}
        />
      </Stack>
      <DetailsList
        selectionMode={deleteMode ? SelectionMode.multiple : SelectionMode.none}
        columns={columns}
        items={taskList.tasks}
        onRenderRow={renderRow}
      />
      <NewTaskDialog isVisible={newTaskDialogVisible} setVisible={setNewTaskDialogVisible} />
    </>
  );
}
