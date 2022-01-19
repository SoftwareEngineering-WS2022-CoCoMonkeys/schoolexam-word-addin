import ITask from "../word/ITask";
import IDTO from "./IDTO";

/**
 * DTO for {@link ITask}
 */
export default class TaskDTO implements IDTO<ITask> {
  /** The unique ID (UUID) of this task */
  id: string;
  /** A human-readable description of this task. Usually containing the index of the task in the document. */
  title: string;
  /** The maximum achievable points */
  maxPoints: number;

  constructor(id: string, title: string, maxPoints: number) {
    this.id = id;
    this.title = title;
    this.maxPoints = maxPoints;
  }

  static fromModel(model: ITask): TaskDTO {
    return new TaskDTO(model.id, model.title, model.maxPoints);
  }

  toModel(): ITask {
    throw new Error("Method not implemented.");
  }
}
