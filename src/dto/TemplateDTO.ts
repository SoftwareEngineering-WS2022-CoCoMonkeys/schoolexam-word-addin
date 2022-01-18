import TaskDTO from "./TaskDTO";
import ITaskList from "../word/ITaskList";
import IDTO from "./IDTO";

export default class TemplateDTO implements IDTO<{ taskPdf: string; tasks: ITaskList }> {
  /** base64 encoded PDF of the exam template */
  taskPdf: string;
  tasks: TaskDTO[];

  private constructor(taskPdf: string, tasks: TaskDTO[]) {
    this.taskPdf = taskPdf;
    this.tasks = tasks;
  }

  static fromModel(taskPdf: string, model: ITaskList) {
    return new TemplateDTO(
      taskPdf,
      model.tasks.map((t) => TaskDTO.fromModel(t))
    );
  }

  toModel(): { taskPdf: string; tasks: ITaskList } {
    throw new Error("Method not implemented.");
  }
}
