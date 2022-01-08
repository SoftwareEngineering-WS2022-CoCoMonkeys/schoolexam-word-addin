import { useEffect, useState } from "react";
import * as React from "react";
import ApiService from "../services/ApiService";
import { List } from "@fluentui/react";
import Exam from "../../../model/Exam";
import "./ExamList.scss";

export interface ExamListProps {
  selectedExam: Exam;
  setSelectedExam: (exam: Exam) => void;
}

export default function ExamList(props: ExamListProps) {
  const [exams, setExams] = useState([]);

  function onRenderExamCell(exam: Exam) {
    return (
      <div className="exam-cell" onClick={() => props.setSelectedExam(exam)}>
        <div>
          {exam.id} - {exam.title} - {exam.subject}
        </div>
        <div>{exam.dateOfExam.toLocaleDateString("de-DE")}</div>
      </div>
    );
  }

  useEffect(() => {
    ApiService.getExams().then((result) => {
      console.log(result);
      setExams(result);
    });
  }, []);
  return <List id="exam-list" items={exams} onRenderCell={onRenderExamCell} />;
}
