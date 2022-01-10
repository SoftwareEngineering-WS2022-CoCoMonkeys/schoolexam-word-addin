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

  async jumpTo(context: Word.RequestContext) {
    const contentControl = this.getAssociatedContentControl(context);
    const range = contentControl.getRange(RangeLocation.whole);
    range.select(SelectionMode.select);

    await context.sync();
  }

  jumpToAsync(): Promise<void> {
    return Word.run(async (context) => this.jumpTo(context));
  }

  editAsync(fieldName: string, newValue: string): Promise<void> {
    return Word.run(async (context) => this.edit(context, fieldName, newValue));
  }

  async edit(context: Word.RequestContext, fieldName: string, newValue: string): Promise<void> {
    this[fieldName] = newValue;
    if (fieldName === "title") {
      const contentControl = this.getAssociatedContentControl(context);
      contentControl.title = newValue;
    }

    await context.sync();
  }

  getAssociatedContentControlAsync(): Promise<Word.ContentControl | null> {
    return Word.run(async (context) => this.getAssociatedContentControl(context));
  }

  getAssociatedContentControl(context: Word.RequestContext): Word.ContentControl | null {
    return context.document.contentControls.getByIdOrNullObject(this.ccId);
  }

  getLInkContentControlAsync(): Promise<Word.ContentControl | null> {
    return Word.run(async (context) => this.getLinkContentControl(context));
  }

  getLinkContentControl(context: Word.RequestContext): Word.ContentControl | null {
    return context.document.contentControls.getByIdOrNullObject(this.linkCcId);
  }
}
