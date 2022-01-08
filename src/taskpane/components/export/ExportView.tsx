import * as React from "react";
import "./ExportView.scss";
import ExamList from "./ExamList";
import Exam from "../../../model/Exam";
import PrepareExportButton from "./PrepareExportButton";
import ExportButton from "./ExportButton";
import TaskList from "../../../model/TaskList";

export interface ExportViewProps {
  selectedExam: Exam;
  setSelectedExam: (exam: Exam) => void;
  taskList: TaskList;
  setTaskList: (taskList: TaskList) => void;
  exportButtonDisabled: boolean;
  setExportButtonDisabled: (exportButtonDisabled: boolean) => void;
}

export default function ExportView(props: ExportViewProps) {

  

  return (
    <div id="export-view">
      <ExamList selectedExam={props.selectedExam} setSelectedExam={props.setSelectedExam} />
      <PrepareExportButton 
        taskList={props.taskList}
        exportButtonDisabled={props.exportButtonDisabled}
        setExportButtonDisabled={props.setExportButtonDisabled}/>
      <ExportButton 
        exportButtonDisabled={props.exportButtonDisabled}
        selectedExam={props.selectedExam}/>
    </div>
  );
}
