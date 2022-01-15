import TaskDTO from "./TaskDTO";

export default class TemplateDTO {
  /** base64 encoded PDF of the exam template */
  taskPdf: string;
  tasks: TaskDTO[];

  constructor(taskPdf: string, tasks: TaskDTO[]) {
    this.taskPdf = taskPdf;
    this.tasks = tasks;
  }
}
