import * as React from "react";
import ExportButton from "./ExportButton";
import "./ExportView.scss";
import ExamList from "./ExamList";

export default function ExportView(_props: any) {
  return (
    <div id="export-view">
      <ExamList></ExamList>
      <ExportButton />
    </div>
  );
}
