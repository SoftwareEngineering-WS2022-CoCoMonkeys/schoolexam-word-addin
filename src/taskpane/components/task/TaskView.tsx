import * as React from "react";
import TaskTable from "./TaskTable";
import TaskList from "../../../model/TaskList";
import NewTaskForm from "./NewTaskForm";
import "./TaskView.scss";
import { useEffect, useState } from "react";

export interface TaskViewProps {
  taskList: TaskList;
  editTask: (taskId: string, fieldName: string, newValue: any) => void;
  addTask: (maxPoints: number) => void;
}

export default function TaskView(props: TaskViewProps) {
  return (
    <div id="task-view">
      <TaskTable editTask={props.editTask} taskList={props.taskList} />
      <NewTaskForm addTask={props.addTask} />
    </div>
  );
}
