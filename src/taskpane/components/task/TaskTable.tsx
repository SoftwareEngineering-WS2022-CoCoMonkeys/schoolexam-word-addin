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
import { useTasks } from "../../../store/DocumentStore";
import NewTaskDialog from "./NewTaskDialog";

/**
 * The cell currently being edited
 */
interface ActiveEdit {
  /** The unique ID of the task being edited */
  id: string;
  /** The field name of the task being edited */
  fieldName: string;
}

/**
 * A table that gives an overview over the {@link ITask} associated with the document.
 * Lists the task title and the maximum number of points achievable.
 * @component
 */
export default function TaskTable(): JSX.Element {
  // GLOBAL STATE
  const [taskList, taskListActions] = useTasks();

  // LOCAL STATE
  const [activeEdit, setActiveEdit] = useState(null as ActiveEdit);
  const [deleteMode, setDeleteMode] = useState(false);
  const [newTaskDialogVisible, setNewTaskDialogVisible] = useState(false);

  /**
   * Returns an anonymous render function (= React component) for a given field name of a {@link ITask}.
   * @param fieldName The field name
   */
  function editableColumnRenderer(fieldName: string) {
    // eslint-disable-next-line react/display-name
    return (task: Task) => {
      /**
       * Handler for key events in the currently edited cell.
       * @param event The key event being handled.
       */
      function onEnterAfterEdit(event) {
        if (event.key == "Enter") {
          event.preventDefault();
          taskListActions.editTask(task.id, fieldName, event.currentTarget.value);
          setActiveEdit(null);
        }
      }

      if (activeEdit && activeEdit.id === task.id && fieldName === activeEdit.fieldName) {
        return <TextField defaultValue={task[fieldName]} onKeyPress={onEnterAfterEdit} />;
      } else {
        return <div onDoubleClick={() => setActiveEdit({ id: task.id, fieldName })}>{task[fieldName]}</div>;
      }
    };
  }

  const deleteIcon: IIconProps = {
    iconName: "Delete",
    color: "red",
  };

  const jumpToIcon: IIconProps = {
    iconName: "Pin",
  };

  /** column definitions */
  const columns: IColumn[] = [
    {
      key: "titleColumn",
      name: "Titel",
      fieldName: "title",
      minWidth: 200,
      maxWidth: 300,
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

  /**
   * Returns an anonymous render function (= React component) for the row checkbox.
   * @param task The task for which to render the checkbox
   */
  function rowCheckBoxRenderer(task: Task): IRenderFunction<IDetailsCheckboxProps> {
    // don't actually render the component, instead return a render function
    const renderCheckBox = () =>
      deleteMode ? (
        <IconButton iconProps={deleteIcon} onClick={() => taskListActions.deleteTask(task)} />
      ) : (
        <IconButton iconProps={jumpToIcon} onClick={() => task.jumpToAsync()} />
      );
    return renderCheckBox;
  }

  /**
   * Renders a row in the table.
   * Doesn't actually change the rendering of the row content and only exists to pass the value of the current
   * item to the {@link rowCheckBoxRenderer}.
   * @param rowProps The row details
   * @param defaultRender The default row renderer
   */
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
          text="Zurücksetzen"
          onClick={() => taskListActions.updateTaskTitles()}
          iconProps={{ iconName: "Refresh" }}
        />
      </Stack>
      <DetailsList
        selectionMode={SelectionMode.single}
        columns={columns}
        items={taskList.tasks}
        onRenderRow={renderRow}
      />
      <NewTaskDialog isVisible={newTaskDialogVisible} setVisible={setNewTaskDialogVisible} />
    </>
  );
}
