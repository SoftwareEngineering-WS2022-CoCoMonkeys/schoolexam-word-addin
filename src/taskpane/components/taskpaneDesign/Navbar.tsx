import * as React from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import TaskView from "../task/TaskView";
import ExportView from "../export/ExportView";
import "./Navbar.scss";
import StructureNavbar from "../structural/StructureNavbar";
import useTasks from "../state/TaskStore";
import SubmissionsView from "../submissions/SubmissionsView";

export default function Navbar(_props: unknown): JSX.Element {
  const [taskState, taskActions] = useTasks();

  return (
    <div id="navbar">
      <Pivot aria-label="NavigationBar">
        <PivotItem
          className="pivot-item"
          headerText="Aufgaben"
          itemCount={taskState.taskList.getLength()}
          itemIcon="Dictionary"
        >
          <TaskView />
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Struktur" itemIcon="BulletedTreeList">
          <StructureNavbar />
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Exportieren" itemIcon="Share">
          <ExportView />
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Einreichung" itemIcon="OpenFile">
          <SubmissionsView />
        </PivotItem>
      </Pivot>
    </div>
  );
}
