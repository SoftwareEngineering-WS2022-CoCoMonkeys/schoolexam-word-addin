import { Task } from "./Task";

export default class ExportModel {
  constructor(taskPdf: string, tasks: ExportTask[]) {
    this.taskPdf = taskPdf;
    this.tasks = tasks;
  }

  taskPdf: string;
  tasks: ExportTask[];
}

export class ExportTask {
  constructor(taskId: string, title: string, maxPoints: number) {
    this.taskId = taskId;
    this.title = title;
    this.maxPoints = maxPoints;
  }

  taskId: string;
  title: string;
  maxPoints: number;
}
