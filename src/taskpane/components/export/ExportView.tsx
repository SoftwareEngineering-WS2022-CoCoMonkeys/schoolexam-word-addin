import * as React from "react";
import "./ExportView.scss";
import ExamList from "./ExamList";
import ExportButton from "./ExportButton";
import { MessageBar, MessageBarType, Stack } from "@fluentui/react";
import BuildButton from "./BuildButton";
import ConvertButton from "./ConvertButton";
import usePrep from "../state/PreparationStore";
import { useLoggedIn } from "../state/AuthenticationStore";

export default function ExportView(_props: unknown): JSX.Element {
  const [prepState] = usePrep();
  const [loggedIn] = useLoggedIn();

  const lockedContent = loggedIn ? (
    <>
      <ExamList />
      <ExportButton />
      <BuildButton />
    </>
  ) : (
    <MessageBar messageBarType={MessageBarType.blocked}>
      Sie müssen sich zuerst einloggen, um eine Prüfung zu exportieren oder zu kompilieren.
    </MessageBar>
  );
  return (
    <Stack horizontal={false} horizontalAlign="center" tokens={{ childrenGap: 20 }}>
      <ConvertButton />
      {lockedContent}
    </Stack>
  );
}
