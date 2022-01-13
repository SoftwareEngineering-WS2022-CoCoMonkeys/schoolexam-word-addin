import * as React from "react";
import TaskTable from "./TaskTable";
import TaskList from "../../../word/TaskList";
import NewTaskForm from "./NewTaskForm";
import "./TaskView.scss";
import { Separator } from "@fluentui/react";

export interface TaskViewProps {
  taskList: TaskList;
  setTaskList: (taskList: TaskList) => void;
}

export default function TaskView(props: TaskViewProps): JSX.Element {
  return (
    <div id="task-view">
      <NewTaskForm taskList={props.taskList} setTaskList={props.setTaskList} />
      <Separator className="horizontal-separator" />
      <TaskTable taskList={props.taskList} setTaskList={props.setTaskList} />
    </div>
  );
}
