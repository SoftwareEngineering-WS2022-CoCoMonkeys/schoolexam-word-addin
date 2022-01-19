import TaskDTO from "./TaskDTO";
import ITaskList from "../word/ITaskList";
import IDTO from "./IDTO";

/**
 * DTO containing the task PDF and the associated tasks.
 * Information about task position is embedded into the document via hyperlinks.
 */
export default class TemplateDTO implements IDTO<{ taskPdf: string; tasks: ITaskList }> {
  /** base64 encoded PDF of the exam template */
  taskPdf: string;
  tasks: TaskDTO[];

  private constructor(taskPdf: string, tasks: TaskDTO[]) {
    this.taskPdf = taskPdf;
    this.tasks = tasks;
  }

  /**
   * Create DTO from model object
   * @param taskPdf The PDF document to set for this template.
   * @param model The tasks to be associated with this template.
   */
  static fromModel(taskPdf: string, model: ITaskList): TemplateDTO {
    return new TemplateDTO(
      taskPdf,
      model.tasks.map((t) => TaskDTO.fromModel(t))
    );
  }

  /**
   * @inheritDoc
   */
  toModel(): { taskPdf: string; tasks: ITaskList } {
    throw new Error("Method not implemented.");
  }
}
