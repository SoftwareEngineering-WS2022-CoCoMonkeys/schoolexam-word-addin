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

  function addTaskFromSelection(maxPoints: number) {
    taskList.addTaskFromSelection(maxPoints).then((taskList) => setTaskList(taskList));
  }

  function editTask(taskId: string, fieldName: string, newValue: any): void {
    const taskToEdit = taskList.getTaskById(taskId);
    taskToEdit[fieldName] = newValue;
    // Force refresh
    setTaskList(taskList);
  }

  return (
    <div id="task-view">
      <TaskTable editTask={editTask} taskList={taskList} />
      <NewTaskForm addTask={addTaskFromSelection}></NewTaskForm>
    </div>
  );
}
