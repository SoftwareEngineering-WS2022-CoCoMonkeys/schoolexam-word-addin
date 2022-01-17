import * as React from "react";
import "./ExportView.scss";
import ExamList from "./ExamList";
import ExportButton from "./ExportButton";
import { MessageBar, MessageBarType, Stack } from "@fluentui/react";
import BuildButton from "./BuildButton";
import ConvertButton from "./ConvertButton";
import usePrep from "../state/PreparationStore";

export default function ExportView(_props: unknown): JSX.Element {
  const [prepState, prepActions] = usePrep();

  const lockedContent = prepState.loggedIn ? (
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
