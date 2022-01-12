import * as React from "react";
import { useEffect, useState } from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import TaskView from "../task/TaskView";
import ExportView from "../export/ExportView";
import "./Navbar.scss";
import { StructureNavbar } from "../structural/StructureNavbar";
import TaskList from "../../../model/TaskList";
import Exam from "../../../model/Exam";

export interface NavbarProps {
  loggedIn: boolean;
}

export default function Navbar(props: NavbarProps): JSX.Element {
  const [taskList, setTaskList] = useState(new TaskList());
  const [selectedExam, setSelectedExam] = useState(null as Exam);

  useEffect(() => {
    taskList.load().then((taskList) => {
      setTaskList(taskList);
    });
  }, []);

  return (
    <div id="navbar">
      <Pivot aria-label="NavigationBar">
        <PivotItem className="pivot-item" headerText="Aufgaben" itemCount={taskList.getLength()} itemIcon="Dictionary">
          <TaskView taskList={taskList} setTaskList={setTaskList} />
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Struktur" itemIcon="BulletedTreeList">
          <StructureNavbar />
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Exportieren" itemIcon="Share">
          <ExportView
            loggedIn={props.loggedIn}
            selectedExam={selectedExam}
            setSelectedExam={setSelectedExam}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </PivotItem>
      </Pivot>
    </div>
  );
}
