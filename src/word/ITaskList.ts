import ITask from "./ITask";

/**
 * A collection of {@link ITask}.
 */
export default interface ITaskList {
  /** The tasks */
  tasks: ITask[];

  /**
   * Asynchronously load  tasks from a persistent storage location.
   * @returns The collection of tasks wrapped in a Promise.
   */
  load(): Promise<ITaskList>;

  /**
   * Asynchronously copy this collection.
   * @returns A copy by value of this collection wrapped in a Promise.
   */
  copyAsync(): Promise<ITaskList>;

  /**
   * @param id The task ID to search for.
   * @returns The task with the specified ID.
   */
  getTaskById(id: string): ITask;

  /**
   * Asynchronously add a new {@link ITask} associated with the currently selected document region.
   * @param maxPoints The maximum number of points for the new task.
   * @param title The title of the new task.
   */
  addTaskFromSelectionAsync(title: string, maxPoints: number): Promise<void>;

  /**
   * Asynchronously delete a task from this collection.
   * @param task The task to delete.
   */
  deleteTaskAsync(task: ITask): Promise<void>;

  /**
   * Asynchronously update the titles of the tasks in this collection to match the order they appear in the document.
   */
  updateTaskTitlesAsync(): Promise<void>;

  /**
   * Asynchronously prepare the document for conversion to PDF.
   */
  prepareForConversion(): Promise<void>;

  /**
   * Asynchronously tear down artefacts from the conversion to PDF.
   */
  afterConversion(): Promise<void>;

  /**
   * @returns The size of this collection.
   */
  getLength(): number;
}
