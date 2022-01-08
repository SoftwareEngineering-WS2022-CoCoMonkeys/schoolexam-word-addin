import * as React from "react";
import { Pivot, PivotItem, Stack } from "@fluentui/react";
import TaskView from "../task/TaskView";
import ExportView from "../export/ExportView";
import "./Navbar.scss";
import { StructureNavbar } from "../structural/StructureNavbar";
import { useState } from "react";
import TaskList from "../../../model/TaskList";
import Exam from "../../../model/Exam";

export default function Navbar(_props) {
  const [exportButtonDisabled, setExportButtonDisabled] = React.useState(true);
  const [taskList, setTaskList] = useState(new TaskList());
  const [selectedExam, setSelectedExam] = useState(null as Exam);

  React.useEffect(() => {
    taskList.load().then((taskList) => {
      setTaskList(taskList);
    });
  }, []);
  
  function addTaskFromSelection(maxPoints: number): void {
    taskList.addTaskFromSelection(maxPoints);
    setTaskList(taskList);
  }

  function editTask(taskId: string, fieldName: string, newValue: any): void {
    taskList.editTask(taskId, fieldName, newValue);
    setTaskList(taskList);
  }
  
  return (
    <div>
      <Pivot aria-label="NavigationBar">
        <PivotItem className="pivot-item" headerText="Aufgaben" itemCount={taskList.tasks.length} itemIcon="Dictionary">
          <TaskView taskList={taskList} addTask={addTaskFromSelection} editTask={editTask} />
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Struktur" itemIcon="BulletedTreeList">
          <Stack horizontal>
            <StructureNavbar />
          </Stack>
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Extras" itemIcon="Star">
          //TODO
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Exportieren" itemIcon="Share">
          <ExportView 
            selectedExam={selectedExam} 
            setSelectedExam={setSelectedExam}
            taskList={taskList}
            setTaskList={setTaskList}
            exportButtonDisabled={exportButtonDisabled}
            setExportButtonDisabled={setExportButtonDisabled} />
        </PivotItem>
      </Pivot>
    </div>
  );
}
