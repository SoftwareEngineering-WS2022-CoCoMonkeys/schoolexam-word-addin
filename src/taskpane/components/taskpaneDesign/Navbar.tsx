import * as React from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import TaskView from "../task/TaskView";
import ExportView from "../export/ExportView";
import StructureNavbar from "../structural/StructureNavbar";
import { useTasks } from "../../../store/DocumentStore";
import SubmissionsView from "../submissions/SubmissionsView";

/**
 * The main navigation bar.
 * @component
 */
export default function Navbar(): JSX.Element {
  const [taskList] = useTasks();

  return (
    <Pivot aria-label="NavigationBar" overflowBehavior="menu">
      <PivotItem className="pivot-margin" headerText="Aufgaben" itemCount={taskList.getLength()} itemIcon="Dictionary">
        <TaskView />
      </PivotItem>
      <PivotItem className="pivot-margin" headerText="Struktur" itemIcon="BulletedTreeList">
        <StructureNavbar />
      </PivotItem>
      <PivotItem className="pivot-margin" headerText="Exportieren" itemIcon="Share">
        <ExportView />
      </PivotItem>
      <PivotItem className="pivot-margin" headerText="Einreichung" itemIcon="OpenFile">
        <SubmissionsView />
      </PivotItem>
    </Pivot>
  );
}
