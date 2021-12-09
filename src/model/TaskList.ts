import { Task } from "./Task";

export class TaskList {
  readonly tasks: Task[];

  static propertyKey = "task-data";

  constructor() {
    this.tasks = [];
  }

  addTask(task: Task) {
    this.tasks.push(task);
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
