import { Task } from "./Task";

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

  async save(context) {
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

    console.debug("Property String: ", taskListJson);
    const taskList = JSON.parse(taskListJson);

    // Bind content controls
    const ccs = context.document.contentControls;
    for (const task of taskList.tasks) {
      const cc = ccs.getByTitle("Task " + task.taskId).getFirst();
      task.cc = cc;
    }

    console.debug(taskList);
    return taskList;
  }
}
