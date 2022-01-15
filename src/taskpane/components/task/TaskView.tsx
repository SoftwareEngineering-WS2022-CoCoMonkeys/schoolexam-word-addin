import * as React from "react";
import TaskTable from "./TaskTable";
import TaskList from "../../../word/TaskList";
import NewTaskForm from "./NewTaskForm";
import "./TaskView.scss";
import { Separator } from "@fluentui/react";

export default function TaskView(_props: unknown): JSX.Element {
  return (
    <div id="task-view">
      <NewTaskForm />
      <Separator className="horizontal-separator" />
      <TaskTable />
    </div>
  );
}
