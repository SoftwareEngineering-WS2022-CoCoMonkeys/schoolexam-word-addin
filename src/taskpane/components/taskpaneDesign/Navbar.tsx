import * as React from "react";
import { Pivot, PivotItem, Stack } from "@fluentui/react";
import TaskView from "../task/TaskView";
import ExportView from "../export/ExportView";
import "./Navbar.scss";
import { StructureNavbar } from "../structural/StructureNavbar";
import { useEffect, useState } from "react";
import TaskList from "../../../model/TaskList";
import Exam from "../../../model/Exam";

export default function Navbar(_props) {
  const [taskList, setTaskList] = useState(new TaskList());
  const [selectedExam, setSelectedExam] = useState(null as Exam);

  useEffect(() => {
    taskList.load().then((taskList) => {
      setTaskList(taskList);
    });
  }, []);

  useEffect(() => {
    console.log(taskList.getLength());
  });

  return (
    <div id="topLevelNavbar">
      <Pivot aria-label="NavigationBar">
        <PivotItem className="pivot-item" headerText="Aufgaben" itemCount={taskList.getLength()} itemIcon="Dictionary">
          <TaskView taskList={taskList} setTaskList={setTaskList} />
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Struktur" itemIcon="BulletedTreeList">
          <Stack horizontal>
            <StructureNavbar />
          </Stack>
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Exportieren" itemIcon="Share">
          <ExportView
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
