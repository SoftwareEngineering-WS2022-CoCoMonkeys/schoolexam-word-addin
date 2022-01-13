import * as React from "react";
import { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import { List, MessageBar, MessageBarType, Spinner } from "@fluentui/react";
import Exam from "../../../word/Exam";
import "./ExamList.scss";

export interface ExamListProps {
  selectedExam: Exam | null;
  setSelectedExam: (exam: Exam) => void;
}

export default function ExamList(props: ExamListProps): JSX.Element {
  const [exams, setExams] = useState([]);

  // retrieve Exams from backend
  useEffect(() => {
    ApiService.getExams().then((result) => {
      setExams(result);
    });
  }, []);

  // custom render function (anonymous component) for a single exam
  function onRenderExamCell(exam: Exam) {
    return (
      <div
        className={`exam-cell ${exam.equals(props.selectedExam) ? "selected-exam" : ""}`}
        onClick={() => {
          if (exam.equals(props.selectedExam)) {
            props.setSelectedExam(null);
          } else {
            props.setSelectedExam(exam);
          }
          // force rerender
          setExams((prevState) => [].concat(prevState));
        }}
      >
        <div>
          {exam.subject} - {exam.title}
        </div>
        <div className="exam-cell-date">am {exam.dateOfExam?.toLocaleDateString() ?? ""}</div>
      </div>
    );
  }

  const examList =
    exams.length > 0 ? <List id="exam-list" items={exams} onRenderCell={onRenderExamCell} /> : <Spinner />;

  return (
    <div>
      <MessageBar messageBarType={MessageBarType.info}>Wählen Sie die passende Prüfung aus!</MessageBar>
      {examList}
    </div>
  );
}
