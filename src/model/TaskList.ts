import { Task } from "./Task";
import WordPersistable from "./WordPersistable";
import { v4 as uuidv4 } from "uuid";

export default class TaskList extends WordPersistable<TaskList> {
  tasks: Task[];

  propertyKey = "task-data";

  constructor() {
    super();
    this.tasks = [];
  }

  getTaskById(taskId: string) {
    return this.tasks.find((task) => task.taskId === taskId);
  }

  getLength() {
    return this.tasks.length;
  }

  copy() {
    return Object.assign(new TaskList(), this) as TaskList;
  }

  udpateTaskTitles(): Promise<TaskList> {
    return Word.run<TaskList>(async (context) => {
      const ccIdMap = new Map();
      for (const task of this.tasks) {
        ccIdMap.set(task.ccId, task);
      }
      const contentControls = context.document.contentControls.items;
      for (const cc of contentControls) {
        console.log(cc.id);
        if (ccIdMap.has(cc.id)) {
          console.log(ccIdMap.get(cc.id));
        }
      }
      await context.sync();

      return this.copy();
    });
  }

  editTask(taskId: string, fieldName: string, newValue: any): Promise<TaskList> {
    return Word.run<TaskList>(async (context) => {
      const taskToEdit = this.getTaskById(taskId);
      taskToEdit[fieldName] = newValue;
      await this.save(context);
      return this.copy();
    });
  }

  toExportTaskList() {
    return this.tasks.map((task) => task.toExportTask());
  }

  addTaskFromSelection(maxPoints: number): Promise<TaskList> {
    return Word.run<TaskList>(async (context) => {
      // New task id
      const newTaskId = uuidv4();

      // Get the current selection
      const range = context.document.getSelection();

      // Create a content control
      const cc = range.insertContentControl();

      // Visually signal content control creation
      cc.appearance = Word.ContentControlAppearance.boundingBox;
      cc.title = "Task " + newTaskId;
      cc.tag = "Task";

      // Need to load ID property first
      cc.load("id");

      await context.sync();

      // title will be updated later anyways
      const newTask = new Task(newTaskId, "Aufgabe " + (this.tasks.length + 1), maxPoints, cc.id, null);

      this.addTask(newTask);

      await this.save(context);

      return this.copy();
    });
  }

  addTask(task: Task) {
    // Remove task first
    if (this.removeTask(task)) {
      console.warn("Overwriting existing task");
    }
    this.tasks.push(task);
  }

  removeTask(task: Task): boolean {
    const index = this.tasks.findIndex((t) => t.taskId == task.taskId);
    if (index != -1) {
      this.tasks.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  clear(context: Word.RequestContext) {
    const ccs = context.document.contentControls;
    for (const task of this.tasks) {
      const cc = ccs.getById(task.ccId);
      // keep the content
      cc.delete(true);
    }
    this.tasks = [];
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
