import usePrep from "../state/PreparationStore";
import { Icon, Text } from "@fluentui/react";
import * as React from "react";
import { useLoggedIn } from "../state/AuthenticationStore";

export default function ExportChecklist(_props: unknown): JSX.Element {
  const [prepState] = usePrep();
  const [loggedIn] = useLoggedIn();

  function activityIconFromStatus(status: boolean) {
    return status ? <Icon iconName={"CheckMark"} color="green" /> : <Icon iconName={"Cancel"} color="red" />;
  }

  const loggedInActivityIcon = activityIconFromStatus(loggedIn);
  const convertedDocumentActivityIcon = activityIconFromStatus(prepState.taskPdf != null);
  const selectedExamActivityIcon = activityIconFromStatus(prepState.selectedExam != null);
  const footerQrCodeActivityIcon = activityIconFromStatus(prepState.qrCode.footerIsPresent());
  const titleQrCodeActivityIcon = activityIconFromStatus(prepState.qrCode.titleIsPresent());

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
