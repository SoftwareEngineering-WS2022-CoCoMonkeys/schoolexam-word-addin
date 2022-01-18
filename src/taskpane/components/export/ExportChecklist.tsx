import { Icon, Stack } from "@fluentui/react";
import * as React from "react";
import { useLoggedIn } from "../state/AuthenticationStore";
import useExams from "../state/ExamsStore";
import { useQrCode } from "../state/DocumentStore";
import { ExamStatus } from "../../../model/Exam";

export default function ExportChecklist(_props: unknown): JSX.Element {
  const [loggedIn] = useLoggedIn();
  const [qrCode] = useQrCode();
  const [examsState] = useExams();

  function activityIconFromStatus(status: boolean, text: string) {
    return (
      <Stack horizontal={true} verticalAlign="center" tokens={{ childrenGap: 5 }}>
        {status ? (
          <Icon iconName={"CheckMark"} styles={{ root: { color: "green" } }} />
        ) : (
          <Icon iconName={"Cancel"} styles={{ root: { color: "red" } }} />
        )}
        <span>{text}</span>
      </Stack>
    );
  }

  const loggedInActivityIcon = activityIconFromStatus(loggedIn, "Eingeloggt");
  const convertedDocumentActivity = activityIconFromStatus(examsState.taskPdf != null, "Dokument konvertiert");
  const selectedExamActivity = activityIconFromStatus(examsState.selectedExam != null, "Prüfung ausgewählt");
  const footerQrCodeActivity = activityIconFromStatus(qrCode.footerIsPresent(), "QR-Code in Fußzeile");
  const titleQrCodeActivity = activityIconFromStatus(qrCode.titleIsPresent(), "QR-Code-(Platzhalter) auf Titelseite");

  const validExamStateActivity = activityIconFromStatus(
    examsState.selectedExam.status !== ExamStatus.Planned &&
      examsState.selectedExam.status !== ExamStatus.BuildReady &&
      examsState.selectedExam.status !== ExamStatus.SubmissionReady,
    'Prüfung ist "Geplant", "Kompilierbereit" oder "Einreichungsbereit"'
  );
  return (
    <Stack horizontal={false} tokens={{ childrenGap: 4 }}>
      {loggedInActivityIcon}
      {convertedDocumentActivity}
      {selectedExamActivity}
      {footerQrCodeActivity}
      {titleQrCodeActivity}
      {validExamStateActivity}
    </Stack>
  );
}
