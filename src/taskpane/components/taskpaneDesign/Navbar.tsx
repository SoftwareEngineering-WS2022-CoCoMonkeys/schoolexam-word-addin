import * as React from "react";
import { useEffect } from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import TaskView from "../task/TaskView";
import ExportView from "../export/ExportView";
import "./Navbar.scss";
import StructureNavbar from "../structural/StructureNavbar";
import { useTasks } from "../state/DocumentStore";
import SubmissionsView from "../submissions/SubmissionsView";
import ITaskList from "../../../word/ITaskList";

export default function Navbar(_props: unknown): JSX.Element {
  const [taskList] = useTasks();

  return (
    <div id="navbar">
      <Pivot aria-label="NavigationBar">
        <PivotItem className="pivot-item" headerText="Aufgaben" itemCount={taskList.getLength()} itemIcon="Dictionary">
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
