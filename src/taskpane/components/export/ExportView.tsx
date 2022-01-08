import * as React from "react";
import ExportButton from "./ExportButton";
import "./ExportView.scss";
import ExamList from "./ExamList";
import PrepareExportButton from "./PrepareExportButton";

export default function ExportView(_props: any) {
  const [exportButtonDisabled, setExportButtonDisabled] = React.useState(true);


  return (
    <div id="export-view">
      <ExamList></ExamList>
      <PrepareExportButton 
        exportButtonDisabled={exportButtonDisabled}
        setExportButtonDisabled={setExportButtonDisabled}/>
      <ExportButton 
        exportButtonDisabled={exportButtonDisabled}/>
    </div>
  );
}
