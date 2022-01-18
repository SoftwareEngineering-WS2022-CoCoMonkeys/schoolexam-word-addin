import * as React from "react";
import { useEffect } from "react";
import { List, MessageBar, MessageBarType, Spinner, SpinnerSize, Stack } from "@fluentui/react";
import Exam, { ExamStatus } from "../../../model/Exam";
import RequestStatus from "../state/RequestStatus";
import useExams from "../state/ExamsStore";
import { useLoggedIn } from "../state/AuthenticationStore";
import "./ExamList.scss";

interface ExamListProps {
  unselectableExams: (Exam) => boolean;
}

export default function ExamList(props: ExamListProps): JSX.Element {
  // GLOBAL STATE
  const [examsState, examsActions] = useExams();
  const [loggedIn] = useLoggedIn();

  // retrieve Exams from backend
  useEffect(() => {
    if (loggedIn) {
      examsActions.loadExams();
    }
  }, [loggedIn]);

  // custom render function (anonymous component) for a single exam
  function onRenderExamCell(exam: Exam) {
    // Only exams in the first two stages are available
    const unselectable = props.unselectableExams(exam);

    let examStatusText: string;
    switch (exam.status) {
      case ExamStatus.Planned:
        examStatusText = "Geplant";
        break;
      case ExamStatus.BuildReady:
        examStatusText = "Kompilierbereit";
        break;
      case ExamStatus.SubmissionReady:
        examStatusText = "Einreichungsbereit";
        break;
      case ExamStatus.InCorrection:
        examStatusText = "In Korrektur";
        break;
      case ExamStatus.Corrected:
        examStatusText = "Korrigiert";
        break;
      case ExamStatus.Published:
        examStatusText = "Veröffentlich";
        break;
      default:
        examStatusText = "";
    }
    return (
      <Stack
        horizontal={false}
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
        <Stack className="stretch" horizontal={true} tokens={{ childrenGap: 5 }}>
          <Stack.Item grow align="start">
            <span style={{ fontWeight: "bold" }}> {exam.title} - </span>
            <span>{exam.topic}</span>
          </Stack.Item>
          <Stack.Item align="end" className="exam-status">
            {examStatusText}
          </Stack.Item>
        </Stack>
        <div className="exam-cell-date">am {exam.date?.toLocaleDateString() ?? ""}</div>
      </Stack>
    );
  }

  const examList =
    examsState.examsStatus !== RequestStatus.WAITING ? (
      <List id="exam-list" items={examsState.exams} onRenderCell={onRenderExamCell} />
    ) : (
      <Spinner size={SpinnerSize.large} />
    );

  return loggedIn ? (
    <>
      <MessageBar messageBarType={MessageBarType.info}>Wählen Sie die passende Prüfung aus!</MessageBar>
      {examList}
    </>
  ) : (
    <MessageBar messageBarType={MessageBarType.blocked}>
      Sie müssen sich zuerst einloggen, um die verfügbaren Prüfungen anzusehen.
    </MessageBar>
  );
}
