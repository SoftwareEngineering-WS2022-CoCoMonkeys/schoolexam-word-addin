import * as React from "react";
import "./ExportView.scss";
import ExamList from "./ExamList";
import Exam from "../../../model/Exam";
import ExportButton from "./ExportButton";
import TaskList from "../../../model/TaskList";
import { MessageBar, MessageBarType } from "@fluentui/react";

export interface ExportViewProps {
  selectedExam: Exam;
  setSelectedExam: (exam: Exam) => void;
  taskList: TaskList;
  setTaskList: (taskList: TaskList) => void;
  loggedIn: boolean;
}

export default function ExportView(props: ExportViewProps): JSX.Element {
  const mainContent = props.loggedIn ? (
    <div>
      <ExamList selectedExam={props.selectedExam} setSelectedExam={props.setSelectedExam} />
      <ExportButton taskList={props.taskList} selectedExam={props.selectedExam} />
    </div>
  ) : (
    <MessageBar messageBarType={MessageBarType.blocked}>
      Sie müssen sich zuert einloggen, um eine Prüfung zu exportieren.
    </MessageBar>
  );
  return (
    <div id="export-view" className="center-items">
      {mainContent}
    </div>
  );
}
