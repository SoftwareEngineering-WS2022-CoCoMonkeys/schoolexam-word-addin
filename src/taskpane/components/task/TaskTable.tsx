// @ts-ignore
import * as React from "react";
import { DetailsList, IColumn } from "@fluentui/react";
import TaskList from "../../../model/TaskList";
import "./TaskTable.scss";

export interface TaskTableProps {
  taskList: TaskList;
}

export interface TaskTableState {}

export default class TaskTable extends React.Component<TaskTableProps, TaskTableState> {
  constructor(props) {
    super(props);
  }

  render() {
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
        <DetailsList columns={columns} items={this.props.taskList.tasks} />
      </div>
    );
  }
}
