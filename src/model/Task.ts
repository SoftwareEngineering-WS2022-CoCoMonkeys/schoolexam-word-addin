import { ExportTask } from "./ExportModel";

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
    if (this === other) {
      return true;
    }
    if (typeof this !== typeof other) {
      return this == other;
    }
    return this.taskId == (other as Task).taskId;
  }

  toExportTask() {
    return new ExportTask(this.taskId, this.title, this.maxPoints);
  }
}
