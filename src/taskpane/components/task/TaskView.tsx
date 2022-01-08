import * as React from "react";
import TaskTable from "./TaskTable";
import TaskList from "../../../model/TaskList";
import NewTaskForm from "./NewTaskForm";
import "./TaskView.scss";
import { useEffect, useState } from "react";

export interface TaskViewProps {
  taskList: TaskList;
  setTaskList: (taskList: TaskList) => void;
}

export default function TaskView(props: TaskViewProps) {
  return (
    <div id="task-view">
      <TaskTable taskList={props.taskList} setTaskList={props.setTaskList} />
      <NewTaskForm taskList={props.taskList} setTaskList={props.setTaskList} />
    </div>
  );
}
