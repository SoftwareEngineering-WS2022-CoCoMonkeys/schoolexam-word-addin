import { ExportTask } from "./ExportModel";
import RangeLocation = Word.RangeLocation;
import SelectionMode = Word.SelectionMode;

export class Task {
  taskId: string;
  title: string;
  maxPoints: number;
  ccId: number;
  linkCcId: number | null;

  constructor(taskId: string, title: string, maxPoints: number, ccId: number, linkCcId: number | null) {
    this.taskId = taskId;
    this.title = title;
    this.maxPoints = maxPoints;
    this.ccId = ccId;
    this.linkCcId = linkCcId;
  }

  equals(other: any): boolean {
    if (other == null) {
      return false;
    }
    if (this === other) {
      return true;
    }
    if (typeof this !== typeof other) {
      return this == other;
    }
    return this.taskId === (other as Task).taskId;
  }

  toExportTask() {
    return new ExportTask(this.taskId, this.title, this.maxPoints);
  }

  jumpTo(): void {
    Word.run(async (context) => {
      const contentControl = context.document.contentControls.getByIdOrNullObject(this.ccId);
      const range = contentControl.getRange(RangeLocation.whole);
      range.select(SelectionMode.select);
    });
  }
}
