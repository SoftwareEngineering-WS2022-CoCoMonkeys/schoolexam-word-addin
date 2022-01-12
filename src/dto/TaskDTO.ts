export default class TaskDTO {
  taskId: string;
  title: string;
  maxPoints: number;

  constructor(taskId: string, title: string, maxPoints: number) {
    this.taskId = taskId;
    this.title = title;
    this.maxPoints = maxPoints;
  }
}
