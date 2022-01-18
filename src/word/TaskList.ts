import Task from "./Task";
import WordPersistable from "./WordPersistable";
import { v4 as uuidv4 } from "uuid";
import TaskDTO from "../export_dto/TaskDTO";
import ITaskList from "../model/ITaskList";

export default class TaskList extends WordPersistable<TaskList> implements ITaskList {
  propertyKey = "task-data";

  constructor() {
    super();
    this._tasks = [];
  }

  private _tasks: Task[];

  get tasks(): Task[] {
    return this._tasks;
  }

  getTaskById(taskId: string): Task {
    return this._tasks.find((task) => task.taskId === taskId);
  }

  getLength(): number {
    return this._tasks.length;
  }

  async copy(): Promise<TaskList> {
    const copy = Object.assign(new TaskList(), this) as TaskList;
    await copy.saveAsync();
    return copy;
  }

  async updateTaskTitles(context: Word.RequestContext): Promise<TaskList> {
    const ccIdMap = new Map();
    for (const task of this._tasks) {
      ccIdMap.set(task.ccId, task);
    }
    context.load(context.document, "contentControls/id");
    await context.sync();

    // real world numbering
    let counter = 1;
    const orderedTasks = [];
    for (const cc of context.document.contentControls.items) {
      if (ccIdMap.has(cc.id)) {
        const task = ccIdMap.get(cc.id);
        await task.edit(context, "title", `Aufgabe ${(counter++).toString()}`);
        orderedTasks.push(task);
      }
    }

    this._tasks = orderedTasks;

    return this.copy();
  }

  updateTaskTitlesAsync(): Promise<TaskList> {
    return Word.run<TaskList>(async (context) => this.updateTaskTitles(context));
  }

  async editTask(
    context: Word.RequestContext,
    taskId: string,
    fieldName: string,
    newValue: number | string
  ): Promise<TaskList> {
    const taskToEdit = this.getTaskById(taskId);
    await taskToEdit.edit(context, fieldName, newValue);
    return this.copy();
  }

  async deleteTask(context: Word.RequestContext, taskToDelete: Task): Promise<TaskList> {
    // slightly ugly way to get index
    const localTask = this.getTaskById(taskToDelete.taskId);

    await localTask.prepareForDeletion(context);

    const index = this._tasks.indexOf(localTask);
    // task could be deleted in the meanwhile
    if (index != -1) {
      this._tasks.splice(index, 1);
    } else {
      console.warn("Possible synchronization issue: Task already deleted locally");
    }
    return this.copy();
  }

  deleteTaskAsync(taskToDelete: Task): Promise<TaskList> {
    return Word.run(async (context) => this.deleteTask(context, taskToDelete));
  }

  editTaskAsync(taskId: string, fieldName: string, newValue: number | string): Promise<TaskList> {
    return Word.run<TaskList>(async (context) => this.editTask(context, taskId, fieldName, newValue));
  }

  assembleDTO(): TaskDTO[] {
    return this._tasks.map((task) => task.assembleDTO());
  }

  removeLinkContentControlsAsync(): Promise<void> {
    return Word.run(async (context) => this.removeLinkContentControls(context));
  }

  async removeLinkContentControls(context: Word.RequestContext): Promise<void> {
    for (const task of this._tasks) {
      await task.removeLinkContentControls(context);
    }
  }

  insertLinkContentControlsAsync(): Promise<void> {
    return Word.run(async (context) => this.insertLinkContentControls(context));
  }

  async insertLinkContentControls(context: Word.RequestContext): Promise<void> {
    for (const task of this._tasks) {
      await task.insertLinkContentControls(context);
    }
  }

  async addTaskFromSelection(context: Word.RequestContext, maxPoints: number): Promise<TaskList> {
    // Get the current selection
    const range = context.document.getSelection();

    // Create a content control
    const cc = range.insertContentControl();

    // Visually signal content control creation
    cc.cannotDelete = true;
    cc.appearance = Word.ContentControlAppearance.boundingBox;
    cc.title = "Aufgabe " + (this._tasks.length + 1);
    cc.tag = "task";

    // Need to load ID property first
    cc.load("id");

    await context.sync();

    const newTask = new Task(uuidv4(), cc.title, maxPoints, cc.id, null);

    this._tasks.push(newTask);

    return this.copy();
  }

  addTaskFromSelectionAsync(maxPoints: number): Promise<TaskList> {
    return Word.run(async (context) => this.addTaskFromSelection(context, maxPoints));
  }

  async init(loadedTaskList: TaskList, context: Word.RequestContext): Promise<void> {
    // Bind content controls
    for (const task of loadedTaskList.tasks) {
      const cc = task.getAssociatedContentControl(context);

      if (cc == null) {
        console.error(`Missing content control for ${task.taskId}`);
      }
    }
  }

  reviver(key: string, value: unknown): unknown {
    if (value == null) {
      return null;
    }
    if (key === "") {
      return Object.assign(new TaskList(), value);
    }
    if (value["_taskId"] != null) {
      // @ts-ignore
      return Object.assign(new Task(), value);
    }
    return value;
  }

  newEmpty(): TaskList {
    return new TaskList();
  }
}
