import Task from "../word/Task";

export default class TaskDTO {
  id: string;
  title: string;
  maxPoints: number;

  constructor(id: string, title: string, maxPoints: number) {
    this.id = id;
    this.title = title;
    this.maxPoints = maxPoints;
  }
}
