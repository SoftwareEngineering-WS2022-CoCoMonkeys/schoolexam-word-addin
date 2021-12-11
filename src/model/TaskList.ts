import { Task } from "./Task";

// A table that displays the association between tasks and points.
// Should always be in sync
const taskTable = document.getElementById("task-table") as HTMLTableElement;
const taskTableBody = document.getElementById("task-table-body");

export class TaskList {
  tasks: Task[];

  static propertyKey = "task-data";

  constructor() {
    this.tasks = [];
  }

  addTask(task: Task) {
    // Remove task first
    if (this.removeTask(task)) {
      console.warn("Overwriting existing task");
    }
    this.tasks.push(task);
    this.syncWithTable();
  }

  removeTask(task: Task): boolean {
    const index = this.tasks.findIndex((t) => t.localTaskId == task.localTaskId);
    if (index != -1) {
      this.tasks.splice(index, 1);
      this.syncWithTable();
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
    this.syncWithTable();
  }

  syncWithTable() {
    // Remove all siblings
    taskTableBody.innerHTML = "";

    // Append row for each task
    for (const task of this.tasks) {
      taskTableBody.appendChild(task.toHtmlTableRow());
    }
  }

  async save(context: Word.RequestContext) {
    // Overwrite task data
    context.document.properties.customProperties.add(TaskList.propertyKey, JSON.stringify(this));
    // Force subsequent saving
    context.document.save();

    console.log("Saved tasks");
  }

  static async load(context: Word.RequestContext): Promise<TaskList> {
    context.load(context.document.properties.customProperties);
    const customProp = context.document.properties.customProperties.getItemOrNullObject(TaskList.propertyKey);

    if (customProp == null) {
      return new TaskList();
    }

    customProp.load("value");

    await context.sync();

    const taskListJson = customProp.value;

    if (taskListJson == null) {
      return new TaskList();
    }

    // Use custom revivor for parsing
    const taskReviver = (key, value) => {
      if (value == null) {
        return null;
      }
      if (value["tasks"] != null) {
        return Object.assign(new TaskList(), value);
      }
      if (value["localTaskId"] != null) {
        // @ts-ignore
        return Object.assign(new Task(), value);
      }
      return value;
    };
    const taskList = JSON.parse(taskListJson, taskReviver) as TaskList;

    // Bind content controls
    const ccs = context.document.contentControls;
    for (const task of taskList.tasks) {
      const cc = ccs.getByTitle("Task " + task.localTaskId).getFirst();

      cc.load("id");

      await context.sync();

      task.ccId = cc.id;
    }

    taskList.syncWithTable();
    return taskList;
  }
}
