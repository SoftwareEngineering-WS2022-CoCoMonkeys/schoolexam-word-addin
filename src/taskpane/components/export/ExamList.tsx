import * as React from "react";
import { useEffect } from "react";
import { List, MessageBar, MessageBarType, Spinner, SpinnerSize } from "@fluentui/react";
import Exam from "../../../import_dto/Exam";
import "./ExamList.scss";
import RequestStatus from "../state/RequestStatus";
import useExams from "../state/ExamsStore";

interface ExamListProps {
  unselectableExams: (Exam) => boolean;
}

export default function ExamList(props: ExamListProps): JSX.Element {
  // GLOBAL STATE
  const [examsState, examsActions] = useExams();

  // retrieve Exams from backend
  useEffect(() => {
    examsActions.loadExams();
  }, []);

  // custom render function (anonymous component) for a single exam
  function onRenderExamCell(exam: Exam) {
    // Only exams in the first two stages are available
    const unselectable = props.unselectableExams(exam);
    return (
      <div
        className={`exam-cell ${exam.equals(examsState.selectedExam) ? "selected-exam" : ""} ${
          unselectable ? "unselectable-exam-cell" : "selectable-exam-cell"
        }`}
        onClick={() => {
          if (unselectable) {
            return;
          }
          if (exam.equals(examsState.selectedExam)) {
            examsActions.setSelectedExam(null);
          } else {
            examsActions.setSelectedExam(exam);
          }
          // force rerender
          examsActions.rerender();
        }}
      >
        <div>
          {exam.title} - {exam.topic} - {exam.status}
        </div>
        <div className="exam-cell-date">am {exam.date?.toLocaleDateString() ?? ""}</div>
      </div>
    );
  }

  const examList =
    examsState.examsStatus !== RequestStatus.WAITING ? (
      <List id="exam-list" items={examsState.exams} onRenderCell={onRenderExamCell} />
    ) : (
      <Spinner size={SpinnerSize.large} />
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
