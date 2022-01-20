import Task from "./Task";
import WordPersistable from "./WordPersistable";
import { v4 as uuidv4 } from "uuid";
import ITaskList from "./ITaskList";

/**
 * A collection of tasks that use {@link Word.ContentControl} to link to regions in the document.
 * This collection is persisted inside the Word document using custom properties.
 */
export default class TaskList extends WordPersistable<ITaskList> implements ITaskList {
  propertyKey = "task-data";
  /**
   * @inheritDoc
   */
  tasks: Task[];

  constructor() {
    super();
    this.tasks = [];
  }

  /**
   * @inheritDoc
   */
  async prepareForConversion(): Promise<void> {
    await this.insertLinkContentControlsAsync();
  }

  /**
   * @inheritDoc
   */
  async afterConversion(): Promise<void> {
    await this.removeLinkContentControlsAsync();
  }

  /**
   * @inheritDoc
   */
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  /**
   * @inheritDoc
   */
  getLength(): number {
    return this.tasks.length;
  }

  /**
   * @inheritDoc
   */
  async copyAsync(): Promise<TaskList> {
    const copy = Object.assign(new TaskList(), this) as TaskList;
    await copy.saveAsync();
    return copy;
  }

  /**
   * @inheritDoc
   */
  addTaskFromSelectionAsync(title: string, maxPoints: number): Promise<void> {
    return Word.run(async (context) => this.addTaskFromSelection(context, title, maxPoints));
  }

  /**
   * @inheritDoc
   */
  deleteTaskAsync(taskToDelete: Task): Promise<void> {
    return Word.run(async (context) => this.deleteTask(context, taskToDelete));
  }

  /**
   * @inheritDoc
   */
  updateTaskTitlesAsync(): Promise<void> {
    return Word.run(async (context) => this.updateTaskTitles(context));
  }

  /**
   * Asynchronously update the titles of the tasks in this collection to match the order they appear in the document.
   * @param context The current Word request context.
   */
  async updateTaskTitles(context: Word.RequestContext): Promise<void> {
    const ccIdMap = new Map();
    for (const task of this.tasks) {
      ccIdMap.set(task.ccId, task);
    }
    context.load(context.document, "contentControls/id");
    await context.sync();

    // actual document order
    const orderedTasks = [];
    for (const cc of context.document.contentControls.items) {
      if (ccIdMap.has(cc.id)) {
        const task = ccIdMap.get(cc.id);
        orderedTasks.push(task);
      }
    }
    this.tasks = orderedTasks;
  }

  /**
   * Asynchronously delete a task from this collection.
   * @param taskToDelete The task to delete.
   * @param context The current Word request context.
   */
  async deleteTask(context: Word.RequestContext, taskToDelete: Task): Promise<void> {
    // slightly ugly way to get index
    const localTask = this.getTaskById(taskToDelete.id);

    await localTask.prepareForDeletion(context);

    const index = this.tasks.indexOf(localTask);
    // task could be deleted in the meanwhile
    if (index != -1) {
      this.tasks.splice(index, 1);
    } else {
      console.warn("Possible synchronization issue: Task already deleted locally");
    }
  }

  /**
   * Asynchronously remove the link {@link Word.ContentControl} of all tasks in this collection
   */
  removeLinkContentControlsAsync(): Promise<void> {
    return Word.run(async (context) => this.removeLinkContentControls(context));
  }

  /**
   * Asynchronously remove the link {@link Word.ContentControl} of all tasks in this collection
   * @param context The current Word request context
   */
  async removeLinkContentControls(context: Word.RequestContext): Promise<void> {
    for (const task of this.tasks) {
      await task.removeLinkContentControls(context);
    }
  }

  /**
   * Asynchronously inser the link {@link Word.ContentControl} of all tasks in this collection
   */
  insertLinkContentControlsAsync(): Promise<void> {
    return Word.run(async (context) => this.insertLinkContentControls(context));
  }

  /**
   * Asynchronously inser the link {@link Word.ContentControl} of all tasks in this collection.
   * @param context The current Word request context.
   */
  async insertLinkContentControls(context: Word.RequestContext): Promise<void> {
    for (const task of this.tasks) {
      await task.insertLinkContentControls(context);
    }
  }

  /**
   * Asynchronously add a new {@link ITask} associated with the currently selected document region.
   * @param context The current Word request context.
   * @param maxPoints The maximum number of points for the new task.
   * @param title The title of the new task.
   */
  async addTaskFromSelection(context: Word.RequestContext, title: string, maxPoints: number): Promise<void> {
    // Get the current selection
    const range = context.document.getSelection();

    // Create a content control
    const cc = range.insertContentControl();

    // Visually signal content control creation
    cc.cannotDelete = true;
    cc.appearance = Word.ContentControlAppearance.boundingBox;
    cc.title = title;
    cc.tag = "task";

    // Need to load ID property first
    cc.load("id");

    await context.sync();

    const newTask = new Task(uuidv4(), cc.title, maxPoints, cc.id);

    this.tasks.push(newTask);
  }

  /**
   * @inheritDoc
   */
  async init(loadedTaskList: TaskList, context: Word.RequestContext): Promise<void> {
    // Bind content controls
    for (const task of loadedTaskList.tasks) {
      const cc = task.getAssociatedContentControl(context);

      if (cc == null) {
        console.error(`Missing content control for ${task.id}`);
      }
    }
  }

  /**
   * @inheritDoc
   */
  reviver(key: string, value: unknown): unknown {
    if (value == null) {
      return null;
    }
    if (key === "") {
      return Object.assign(new TaskList(), value);
    }
    if (value["id"] != null) {
      // @ts-ignore
      return Object.assign(new Task(), value);
    }
    return value;
  }

  /**
   * @inheritDoc
   */
  newEmpty(): TaskList {
    return new TaskList();
  }
}
