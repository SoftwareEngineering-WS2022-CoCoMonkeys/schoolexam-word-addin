import * as React from "react";
import { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import { List, MessageBar, MessageBarType, Spinner } from "@fluentui/react";
import Exam from "../../../import_dto/Exam";
import "./ExamList.scss";
import usePrep from "../state/PreparationStore";

export enum ExamsState {
  idle,
  waiting,
  error,
  success,
}

export default function ExamList(_props: unknown): JSX.Element {
  const [exams, setExams] = useState([]);
  const [examsState, setExamsState] = useState(ExamsState.idle);
  const [prepState, prepActions] = usePrep();

  // retrieve Exams from backend
  useEffect(() => {
    setExamsState(ExamsState.waiting);
    ApiService.getExams().then((result) => {
      setExams(result);
      setExamsState(ExamsState.success);
    });
  }, []);

  // custom render function (anonymous component) for a single exam
  function onRenderExamCell(exam: Exam) {
    return (
      <div
        className={`exam-cell ${exam.equals(prepState.selectedExam) ? "selected-exam" : ""}`}
        onClick={() => {
          if (exam.equals(prepState.selectedExam)) {
            prepActions.setSelectedExam(null);
          } else {
            prepActions.setSelectedExam(exam);
          }
          // force rerender
          setExams((prevState) => [].concat(prevState));
        }}
      >
        <div>
          {exam.title} - {exam.topic}
        </div>
        <div className="exam-cell-date">am {exam.dateOfExam?.toLocaleDateString() ?? ""}</div>
      </div>
    );
  }

  const examList =
    examsState !== ExamsState.waiting ? (
      <List id="exam-list" items={exams} onRenderCell={onRenderExamCell} />
    ) : (
      <Spinner />
    );

  return (
    <div className="margin-top1">
      <MessageBar messageBarType={MessageBarType.info}>Wählen Sie die passende Prüfung aus!</MessageBar>
      <div id="exam-list-container" className="margin-top1">
        {examList}
      </div>
    </div>
  );
}
