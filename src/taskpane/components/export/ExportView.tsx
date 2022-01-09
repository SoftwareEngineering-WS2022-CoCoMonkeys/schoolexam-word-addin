import * as React from "react";
import "./ExportView.scss";
import ExamList from "./ExamList";
import Exam from "../../../model/Exam";
import ExportButton from "./ExportButton";
import TaskList from "../../../model/TaskList";

export interface ExportViewProps {
  selectedExam: Exam;
  setSelectedExam: (exam: Exam) => void;
  taskList: TaskList;
  setTaskList: (taskList: TaskList) => void;
}

export default function ExportView(props: ExportViewProps) {
  return (
    <div id="export-view">
      <ExamList selectedExam={props.selectedExam} setSelectedExam={props.setSelectedExam} />
      <ExportButton taskList={props.taskList} selectedExam={props.selectedExam} />
    </div>
  );
}
