import * as React from "react";
import ExportButton from "./ExportButton";
import "./ExportView.scss";
import ExamList from "./ExamList";

export default class ExportView extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="export-view">
        <ExamList></ExamList>
        <ExportButton />
      </div>
    );
  }
}
