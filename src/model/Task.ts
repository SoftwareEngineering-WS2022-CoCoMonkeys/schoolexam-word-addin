export class Task {
  taskId: string;
  parentTaskId: string | null;
  maxPoints: number;
  ccId: number;

  constructor(taskId: string, parentTaskId: string, maxPoints: number, ccId: number) {
    this.taskId = taskId;
    this.parentTaskId = parentTaskId;
    this.maxPoints = maxPoints;
    this.ccId = ccId;
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
}
