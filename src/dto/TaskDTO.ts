import ITask from "../word/ITask";
import IDTO from "./IDTO";

export default class TaskDTO implements IDTO<ITask> {
  id: string;
  title: string;
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
