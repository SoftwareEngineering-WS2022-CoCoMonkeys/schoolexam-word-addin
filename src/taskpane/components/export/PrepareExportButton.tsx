import { DefaultButton } from "@fluentui/react";
import React = require("react");
import TaskList from "../../../model/TaskList";

export interface IPrepareExportButtonProps {
  exportButtonDisabled?: boolean;
  setExportButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  taskList?: TaskList;
}

export default function PrepareExportButton(props: IPrepareExportButtonProps) {
  function prepareDocumentForExport() {
    Word.run(async (context) => {
      for (const task of props.taskList.tasks) {
        const contentControl = context.document.body.contentControls.getByIdOrNullObject(task.ccId);
        contentControl.load("text");
        await context.sync();
        contentControl
          .getRange()
          .insertHtml(
            `<a style="text-decoration: none" href="task-${task.taskId}">&nbsp;</a>`,
            Word.InsertLocation.start
          );
        await context.sync();
      }
      await context.sync();
    });
    props.setExportButtonDisabled(false);
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
