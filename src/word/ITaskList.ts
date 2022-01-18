import ITask from "./ITask";

/**
 * Represents a collection of tasks.
 */
export default interface ITaskList {
  tasks: ITask[];

  load(): Promise<ITaskList>;

  copyAsync(): Promise<ITaskList>;

  getTaskById(id: string): ITask;

  addTaskFromSelectionAsync(maxPoints: number): Promise<void>;

  deleteTaskAsync(task: ITask): Promise<void>;

  updateTaskTitlesAsync(): Promise<void>;

  prepareForConversion(): Promise<void>;

  afterConversion(): Promise<void>;

  getLength(): number;
}
