import * as React from "react";
import TaskTable from "./TaskTable";
import TaskList from "../../../model/TaskList";
import NewTaskForm from "./NewTaskForm";
import "./TaskView.scss";
import { useEffect, useState } from "react";

export default function TaskView(_props: any) {
  const [taskList, setTaskList] = useState(new TaskList());

  useEffect(() => {
    taskList.load().then((taskList) => {
      setTaskList(taskList);
    });
  }, []);

  const addTaskFromSelection = (maxPoints: number) => {
    this.state.taskList.addTaskFromSelection(maxPoints, (taskList) => setTaskList(taskList));
  };

  return (
    <div id="task-view">
      <TaskTable taskList={taskList} />
      <NewTaskForm addTask={addTaskFromSelection}></NewTaskForm>
    </div>
  );
}
