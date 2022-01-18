import { PrimaryButton, TextField } from "@fluentui/react";
import * as React from "react";
import "./DocumentTitlePage.scss";
import CalendarInlineOverlaidMonth from "./Calendar";
import { useQrCode } from "../state/DocumentStore";

export default function DocumentTitlePage(_props: unknown): JSX.Element {
  const [examDate, setExamDate] = React.useState(new Date());

  const defaultCourseName = "Mathematik Klasse 8a";
  const [courseName, setCourseName] = React.useState(defaultCourseName);

  const defaultExamTitle = "1. Schulaufgabe";
  const [examTitle, setExamTitle] = React.useState(defaultExamTitle);
  const [qrCodeState, qrCodeActions] = useQrCode();

  const onChangeExamNameTextFieldValue = React.useCallback((_, newValue?: string) => {
    setExamTitle(newValue || "");
  }, []);
  const onChangeCourseNameTextFieldValue = React.useCallback((_, newValue?: string) => {
    setCourseName(newValue || "");
  }, []);

  return (
    <div className="centerTopPadding">
      <TextField
        label="Name des Leistungsnachweises"
        placeholder={`z.B.: ${defaultExamTitle}`}
        onChange={onChangeExamNameTextFieldValue}
      />
      <TextField
        label="Kursname"
        placeholder={`z.B.: ${defaultCourseName}`}
        onChange={onChangeCourseNameTextFieldValue}
      />
      <br />
      <CalendarInlineOverlaidMonth examDate={examDate} setExamDate={setExamDate} />
      <PrimaryButton
        text="Titelseite erstellen"
        id="create-front-page-btn"
        onClick={() => qrCodeActions.createFrontPage(examTitle, examDate, courseName)}
      />
    </div>
  );
}
