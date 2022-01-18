import { Icon, Text } from "@fluentui/react";
import * as React from "react";
import { useLoggedIn } from "../state/AuthenticationStore";
import useExams from "../state/ExamsStore";
import { useQrCode } from "../state/DocumentStore";

export default function ExportChecklist(_props: unknown): JSX.Element {
  const [loggedIn] = useLoggedIn();
  const [qrCode] = useQrCode();
  const [examsState] = useExams();

  function activityIconFromStatus(status: boolean) {
    return status ? <Icon iconName={"CheckMark"} color="green" /> : <Icon iconName={"Cancel"} color="red" />;
  }

  const loggedInActivityIcon = activityIconFromStatus(loggedIn);
  const convertedDocumentActivityIcon = activityIconFromStatus(examsState.taskPdf != null);
  const selectedExamActivityIcon = activityIconFromStatus(examsState.selectedExam != null);
  const footerQrCodeActivityIcon = activityIconFromStatus(qrCode.footerIsPresent());
  const titleQrCodeActivityIcon = activityIconFromStatus(qrCode.titleIsPresent());

  return (
    <div>
      <Text block>Voraussetzungen</Text>
      <ul>
        <li>
          {loggedInActivityIcon}
          Eingeloggt
        </li>
        <li>
          {convertedDocumentActivityIcon}
          Dokument konvertiert
        </li>
        <li>
          {selectedExamActivityIcon}
          Prüfung ausgewählt
        </li>
        <li>
          {footerQrCodeActivityIcon}
          QR-Code in Fußzeile
        </li>
        <li>
          {titleQrCodeActivityIcon}
          QR-Code-Platzhalter auf Titelseite
        </li>
      </ul>
    </div>
  );
}
