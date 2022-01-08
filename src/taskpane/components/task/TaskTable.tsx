import * as React from "react";
import { DetailsList, IColumn } from "@fluentui/react";
import TaskList from "../../../model/TaskList";
import "./TaskTable.scss";

export interface TaskTableProps {
  taskList: TaskList;
}

export default function TaskTable(props: TaskTableProps) {
  const columns: IColumn[] = [
    {
      key: "idColumn",
      name: "Aufgaben-ID",
      fieldName: "taskId",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "parentColumn",
      name: "Übergeordnete Aufgabe",
      fieldName: "parentTaskId",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "maxPointsColumn",
      name: "Maximalpunktzahl",
      fieldName: "maxPoints",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
  ];

  return (
    <div>
      <DetailsList columns={columns} items={props.taskList.tasks} />
    </div>
  );
}
