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
  constructor(id: string, title: string, maxPoints: number) {
    this.id = id;
    this.title = title;
    this.maxPoints = maxPoints;
  }

  id: string;
  title: string;
  maxPoints: number;
}
