import { PrimaryButton } from "@fluentui/react";
import * as React from "react";
import Exam from "../../../model/Exam";
import "./ExportButton.scss";
import PdfService from "../services/PdfService";
import TaskList from "../../../model/TaskList";
import ExportModel from "../../../model/ExportModel";
import RangeLocation = Word.RangeLocation;
import ContentControlAppearance = Word.ContentControlAppearance;
import ApiService from "../services/ApiService";

export interface ExportButtonProps {
  selectedExam: Exam;
  taskList: TaskList;
}

export default function ExportButton(props: ExportButtonProps) {
  function exportExam() {
    prepareDocumentForExport().then(() => {
      PdfService.getDocument().then((pdf: string) => {
        const exportData = new ExportModel(pdf, props.taskList.toExportTaskList());
        ApiService.postExamPdf(props.selectedExam.examId, exportData);
      });

      // reset async
      resetLinkContentControls();
    });
  }

  async function resetLinkContentControls(): Promise<void> {
    return Word.run(async (context) => {
      for (const task of props.taskList.tasks) {
        // Delete existing link content control
        if (task.linkCcId != null) {
          const linkContentControl = context.document.body.contentControls.getByIdOrNullObject(task.linkCcId);
          if (linkContentControl == null) {
            console.warn(`Link content control with id ${task.linkCcId} does not exist`);
            continue;
          } else {
            // Delete with content
            linkContentControl.delete(false);
          }
        }

        await context.sync();
      }
    });
  }

  async function prepareDocumentForExport(): Promise<void> {
    return Word.run(async (context) => {
      await resetLinkContentControls();
      for (const task of props.taskList.tasks) {
        const contentControl = context.document.body.contentControls.getByIdOrNullObject(task.ccId);

        if (contentControl == null) {
          console.error(`Task content control with id ${task.ccId} does not exist`);
          continue;
        }

        await context.sync();

        const linkContentControl = contentControl.getRange(RangeLocation.start).insertContentControl();

        linkContentControl.appearance = ContentControlAppearance.tags;
        linkContentControl.tag = "task-link";
        linkContentControl.title = "task-link-" + task.taskId;

        // Insert anchor element
        linkContentControl.insertHtml(
          `<a style="text-decoration: none; font-size:0.01em; transform: translate(-1px)" href="task-${task.taskId}">&nbsp;</a>`,
          Word.InsertLocation.start
        );

        linkContentControl.load("id");

        await context.sync();

        task.linkCcId = linkContentControl.id;
      }
    });
  }

  return (
    <div>
      <PrimaryButton
        id="export-exam-btn"
        className="margin-btn"
        disabled={props.selectedExam == null}
        onClick={exportExam}
        text="Dokument exportieren"
      />
    </div>
  );
}
