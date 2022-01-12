import { Task } from "./Task";
import WordPersistable from "./WordPersistable";
import { v4 as uuidv4 } from "uuid";
import TaskDTO from "../dto/TaskDTO";

export default class TaskList extends WordPersistable<TaskList> {
  tasks: Task[];

  propertyKey = "task-data";

  constructor() {
    super();
    this.tasks = [];
  }

  getTaskById(taskId: string): Task {
    return this.tasks.find((task) => task.taskId === taskId);
  }

  getLength(): number {
    return this.tasks.length;
  }

  async copy(): Promise<TaskList> {
    const copy = Object.assign(new TaskList(), this) as TaskList;
    await copy.saveAsync();
    return copy;
  }

  async updateTaskTitles(context: Word.RequestContext): Promise<TaskList> {
    const ccIdMap = new Map();
    for (const task of this.tasks) {
      ccIdMap.set(task.ccId, task);
    }
    const contentControls = context.document.contentControls;

    contentControls.load("items");
    await context.sync();

    // real world numbering
    let counter = 1;
    const orderedTasks = [];
    for (const cc of contentControls.items) {
      if (ccIdMap.has(cc.id)) {
        const task = ccIdMap.get(cc.id);
        await task.edit(context, "title", `Aufgabe ${(counter++).toString()}`);
        orderedTasks.push(task);
      }
    }

    this.tasks = orderedTasks;

    return this.copy();
  }

  updateTaskTitlesAsync(): Promise<TaskList> {
    return Word.run<TaskList>(async (context) => this.updateTaskTitles(context));
  }

  async editTask(context: Word.RequestContext, taskId: string, fieldName: string, newValue: any): Promise<TaskList> {
    const taskToEdit = this.getTaskById(taskId);
    await taskToEdit.edit(context, fieldName, newValue);
    return this.copy();
  }

  editTaskAsync(taskId: string, fieldName: string, newValue: any): Promise<TaskList> {
    return Word.run<TaskList>(async (context) => this.editTask(context, taskId, fieldName, newValue));
  }

  assembleDTO(): TaskDTO[] {
    return this.tasks.map((task) => task.assembleDTO());
  }

  removeLinkContentControlsAsync(): Promise<void> {
    return Word.run(async (context) => this.removeLinkContentControls(context));
  }

  async removeLinkContentControls(context: Word.RequestContext): Promise<void> {
    console.log(this.tasks.length);
    for (const task of this.tasks) {
      console.log("task", task.taskId);
      await task.removeLinkContentControl(context);
    }
  }

  insertLinkContentControlsAsync(): Promise<void> {
    return Word.run(async (context) => this.insertLinkContentControls(context));
  }

  async insertLinkContentControls(context: Word.RequestContext): Promise<void> {
    for (const task of this.tasks) {
      await task.insertLinkContentControl(context);
    }
  }

  async addTaskFromSelection(context: Word.RequestContext, maxPoints: number): Promise<TaskList> {
    // Get the current selection
    const range = context.document.getSelection();

    // Create a content control
    const cc = range.insertContentControl();

    // Visually signal content control creation
    cc.appearance = Word.ContentControlAppearance.boundingBox;
    cc.title = "Aufgabe " + (this.tasks.length + 1);
    cc.tag = "Task";

    // Need to load ID property first
    cc.load("id");

    await context.sync();

    const newTask = new Task(uuidv4(), cc.title, maxPoints, cc.id, null);

    this.tasks.push(newTask);

    return this.copy();
  }

  addTaskFromSelectionAsync(maxPoints: number): Promise<TaskList> {
    return Word.run(async (context) => this.addTaskFromSelection(context, maxPoints));
  }

  async init(obj, context: Word.RequestContext): Promise<void> {
    // Bind content controls
    const ccs = context.document.contentControls;
    for (const task of obj.tasks) {
      const cc = ccs.getById(task.ccId);

      if (cc == null) {
        console.error(`Missing content control for ${task.taskId}`);
      }

      cc.load("id");

      await context.sync();
    }
  }

  reviver(_key: string, value) {
    if (value == null) {
      return null;
    }
    if (value["tasks"] != null) {
      return Object.assign(new TaskList(), value);
    }
    if (value["taskId"] != null) {
      // @ts-ignore
      return Object.assign(new Task(), value);
    }
    return value;
  }

  newEmpty(): TaskList {
    const t = new TaskList();
    return t;
  }
}
