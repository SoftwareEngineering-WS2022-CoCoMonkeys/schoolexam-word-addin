import * as React from "react";
import "./ExportView.scss";
import ExamList from "./ExamList";
import ExportButton from "./ExportButton";
import { MessageBar, MessageBarType } from "@fluentui/react";
import BuildButton from "./BuildButton";
import ConvertButton from "./ConvertButton";
import usePrep from "../state/PreparationStore";
import ConvertDownloadButton from "./ConvertDownloadButton";

export default function ExportView(_props: unknown): JSX.Element {
  const [prepState, prepActions] = usePrep();

  const lockedContent = prepState.loggedIn ? (
    <div className="center-items column-flex">
      <ExamList />
      <div className="center-items row-flex two-btn-container margin-top1">
        <ExportButton />
      </div>
      <div className="center-items row-flex two-btn-container margin-top1">
        <BuildButton />
      </div>
    </div>
  ) : (
    <MessageBar messageBarType={MessageBarType.blocked}>
      Sie müssen sich zuerst einloggen, um eine Prüfung zu exportieren oder zu kompilieren.
    </MessageBar>
  );
  return (
    <div className="center-items column-flex">
      <div className="row-flex two-btn-container">
        <ConvertButton />
        <ConvertDownloadButton />
      </div>
      <div className="margin-top1">{lockedContent}</div>
    </div>
  );
}
