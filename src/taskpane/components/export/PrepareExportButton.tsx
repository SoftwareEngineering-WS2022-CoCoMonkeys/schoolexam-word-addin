import { DefaultButton } from "@fluentui/react";
import React = require("react");
import TaskList from "../../../model/TaskList";

export interface IPrepareExportButtonProps {
  exportButtonDisabled?: boolean;
  setExportButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  taskList?: TaskList;
}

export default function PrepareExportButton(_props: IPrepareExportButtonProps) {
  function prepareDocumentForExport() {
    Word.run(async (context) => {
      for (const task of _props.taskList.tasks) {
        const contentControl = context.document.body.contentControls.getByIdOrNullObject(task.ccId);
        contentControl.load("text");
        await context.sync();
        if (!contentControl.isNullObject) {
          const uidString = "#" + task.taskId + "#";
          contentControl.text.indexOf(uidString);
          contentControl.text.lastIndexOf(uidString);
          contentControl.insertText(uidString, Word.InsertLocation.start);
          contentControl.insertText(uidString, Word.InsertLocation.end);
        }
      }
      await context.sync();
    });
    Office.context.ui.displayDialogAsync(
      "https://localhost:3000/exportPreparedDialog.html",
      { height: 35, width: 20, displayInIframe: true },
      function (result) {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
        } else {
          const err = result.error;
          console.log(err.name + ": " + err.message);
        }
      }
    );
    _props.setExportButtonDisabled(false);
  }

  return (
    <div>
      <DefaultButton
        id="prepare-export-exam-btn"
        className="margin-btn"
        onClick={prepareDocumentForExport}
        text="Dokumentenexport vorbereiten"
      />
    </div>
  );
}
