import Task from "./Task";
import WordPersistable from "./WordPersistable";
import { v4 as uuidv4 } from "uuid";
import ITaskList from "./ITaskList";

export default class TaskList extends WordPersistable<ITaskList> implements ITaskList {
  propertyKey = "task-data";
  tasks: Task[];

  constructor() {
    super();
    this.tasks = [];
  }

  async prepareForConversion(): Promise<void> {
    await this.removeLinkContentControlsAsync();
    await this.insertLinkContentControlsAsync();
  }

  async afterConversion(): Promise<void> {
    await this.removeLinkContentControlsAsync();
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  getLength(): number {
    return this.tasks.length;
  }

  async copyAsync(): Promise<TaskList> {
    const copy = Object.assign(new TaskList(), this) as TaskList;
    await copy.saveAsync();
    return copy;
  }

  addTaskFromSelectionAsync(maxPoints: number): Promise<void> {
    return Word.run(async (context) => this.addTaskFromSelection(context, maxPoints));
  }

  deleteTaskAsync(taskToDelete: Task): Promise<void> {
    return Word.run(async (context) => this.deleteTask(context, taskToDelete));
  }

  updateTaskTitlesAsync(): Promise<void> {
    return Word.run(async (context) => this.updateTaskTitles(context));
  }

  async updateTaskTitles(context: Word.RequestContext): Promise<void> {
    const ccIdMap = new Map();
    for (const task of this.tasks) {
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
    this.tasks = orderedTasks;
  }

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

  removeLinkContentControlsAsync(): Promise<void> {
    return Word.run(async (context) => this.removeLinkContentControls(context));
  }

  async removeLinkContentControls(context: Word.RequestContext): Promise<void> {
    for (const task of this.tasks) {
      await task.removeLinkContentControls(context);
    }
  }

  insertLinkContentControlsAsync(): Promise<void> {
    return Word.run(async (context) => this.insertLinkContentControls(context));
  }

  async insertLinkContentControls(context: Word.RequestContext): Promise<void> {
    for (const task of this.tasks) {
      await task.insertLinkContentControls(context);
    }
  }

  async addTaskFromSelection(context: Word.RequestContext, maxPoints: number): Promise<void> {
    // Get the current selection
    const range = context.document.getSelection();

    // Create a content control
    const cc = range.insertContentControl();

    // Visually signal content control creation
    cc.cannotDelete = true;
    cc.appearance = Word.ContentControlAppearance.boundingBox;
    cc.title = "Aufgabe " + (this.tasks.length + 1);
    cc.tag = "task";

    // Need to load ID property first
    cc.load("id");

    await context.sync();

    const newTask = new Task(uuidv4(), cc.title, maxPoints, cc.id, null);

    this.tasks.push(newTask);
  }

  async init(loadedTaskList: TaskList, context: Word.RequestContext): Promise<void> {
    // Bind content controls
    for (const task of loadedTaskList.tasks) {
      const cc = task.getAssociatedContentControl(context);

      if (cc == null) {
        console.error(`Missing content control for ${task.id}`);
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
    if (value["id"] != null) {
      // @ts-ignore
      return Object.assign(new Task(), value);
    }
    return value;
  }

  newEmpty(): TaskList {
    return new TaskList();
  }
}
