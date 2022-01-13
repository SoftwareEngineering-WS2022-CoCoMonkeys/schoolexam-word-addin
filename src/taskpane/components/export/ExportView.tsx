import * as React from "react";
import { useState } from "react";
import "./ExportView.scss";
import ExamList from "./ExamList";
import Exam from "../../../word/Exam";
import ExportButton from "./ExportButton";
import TaskList from "../../../word/TaskList";
import { MessageBar, MessageBarType } from "@fluentui/react";
import BuildButton from "./BuildButton";
import ConvertButton from "./ConvertButton";

export interface ExportViewProps {
  selectedExam: Exam | null;
  setSelectedExam: (exam: Exam) => void;
  taskList: TaskList;
  setTaskList: (taskList: TaskList) => void;
  loggedIn: boolean;
}

export default function ExportView(props: ExportViewProps): JSX.Element {
  const [taskPdf, setTaskPdf] = useState(null);

  const lockedContent = props.loggedIn ? (
    <div className="center-items">
      <ExamList selectedExam={props.selectedExam} setSelectedExam={props.setSelectedExam} />
      <div id="export-btns-container" className="center-items">
        <ExportButton taskList={props.taskList} selectedExam={props.selectedExam} taskPdf={taskPdf} />
        <BuildButton selectedExam={props.selectedExam} taskPdf={taskPdf} />
      </div>
    </div>
  ) : (
    <MessageBar messageBarType={MessageBarType.blocked}>
      Sie müssen sich zuerst einloggen, um eine Prüfung zu exportieren oder zu kompilieren.
    </MessageBar>
  );
  return (
    <div id="export-view" className="center-items">
      <ConvertButton taskList={props.taskList} taskPdf={taskPdf} setTaskPdf={setTaskPdf} />
      {lockedContent}
    </div>
  );
}
