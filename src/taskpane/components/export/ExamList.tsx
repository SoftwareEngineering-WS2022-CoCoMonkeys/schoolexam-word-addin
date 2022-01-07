import { useEffect, useState } from "react";
import * as React from "react";
import ApiService from "../ApiService";
import { List } from "@fluentui/react";
import Exam from "../../../model/Exam";
import "./ExamList.scss";

export default function ExamList(_props) {
  const [exams, setExams] = useState([]);

  function onRenderExamCell(exam: Exam) {
    return (
      <div className="exam-cell">
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
