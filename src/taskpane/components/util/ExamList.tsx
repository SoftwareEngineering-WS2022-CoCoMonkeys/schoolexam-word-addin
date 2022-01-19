import * as React from "react";
import { useEffect } from "react";
import { List, MessageBar, MessageBarType, Spinner, SpinnerSize, Stack } from "@fluentui/react";
import Exam, { ExamStatus } from "../../../model/Exam";
import RequestStatus from "../../../state/RequestStatus";
import useExams from "../../../store/ExamsStore";
import { useLoggedIn } from "../../../store/AuthenticationStore";
import "./ExamList.scss";

/**
 * Properties for {@link ExamList}.
 */
interface ExamListProps {
  /**
   * A filter function to decide which exams are unavailable for selection.
   * @param exam The exam to decide for
   */
  unselectableExams: (exam: Exam) => boolean;
}

/**
 * React component to select an exam from the of all exams available to the user.
 * Exams are retrieved via the exams MicroStore ({@link useExams}), which is also where the exam selection is stored
 * and made available globally (see {@link IExamsState.selectedExam}).
 *
 * If the user is not logged in, an blocking {@link MessageBar} is displayed instead.
 *
 * @param props Configuration options
 * @component
 */
export default function ExamList(props: ExamListProps): JSX.Element {
  // GLOBAL STATE
  const [examsState, examsActions] = useExams();
  const [loggedIn] = useLoggedIn();

  // retrieve Exams from backend when login status changes to true
  useEffect(() => {
    if (loggedIn) {
      examsActions.loadExams();
    }
  }, [loggedIn]);

  // Reset exam to prevent unwanted builds and exports
  useEffect(() => {
    examsActions.setSelectedExam(null);
  }, []);

  /**
   * Custom render function (anonymous component) for a single exam in the list.
   * @param exam The exam to be rendered.
   */
  function onRenderExamCell(exam: Exam) {
    // Only exams in the first two stages are available
    const unselectable = props.unselectableExams(exam);
    const isSelected = exam.equals(examsState.selectedExam);

    if (unselectable && isSelected) {
      // Must reset the selected exam
      examsActions.setSelectedExam(null);
    }

    // Get German localization of the exam status
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
        examStatusText = "Veröffentlicht";
        break;
      default:
        examStatusText = "";
    }

    /**
     * Handles a new exam selection.
     */
    function onExamCellClick() {
      if (exam.equals(examsState.selectedExam)) {
        examsActions.setSelectedExam(null);
      } else {
        examsActions.setSelectedExam(exam);
      }
      // force rerender when selection changes
      examsActions.forceRerender();
    }

    return (
      <Stack
        horizontal={false}
        className={`exam-cell ${isSelected ? "selected-exam" : ""} ${
          unselectable ? "unselectable-exam-cell" : "selectable-exam-cell"
        }`}
        onClick={unselectable ? null : onExamCellClick}
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

  // Should we display the actual list or a loading indicator
  const examList =
    examsState.examsStatus !== RequestStatus.WAITING ? (
      <List id="exam-list" items={examsState.exams} onRenderCell={onRenderExamCell} />
    ) : (
      <Spinner size={SpinnerSize.large} />
    );

  return loggedIn ? (
    <>
      <MessageBar messageBarType={MessageBarType.info} className="msg">
        Wählen Sie die passende Prüfung aus!
      </MessageBar>
      {examList}
    </>
  ) : (
    <MessageBar messageBarType={MessageBarType.blocked} className="msg">
      Sie müssen sich zuerst einloggen, um die verfügbaren Prüfungen anzusehen.
    </MessageBar>
  );
}
