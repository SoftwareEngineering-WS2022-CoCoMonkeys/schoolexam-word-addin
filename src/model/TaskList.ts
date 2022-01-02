import {Task} from "./Task";
import WordPersistable from "./WordPersistable";

export default class TaskList extends WordPersistable<TaskList> {
    tasks: Task[];

    propertyKey = "task-data"

    constructor() {
        super();
        this.tasks = [];
    }

    getTasks() : Task[] {
        return this.tasks
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
            const cc = ccs.getByTitle("Task " + task.taskId).getFirst();

            cc.load("id");

            await context.sync();

            task.ccId = cc.id;
        }
    }

    reviver(key, value) {
        return {key: key, value: value}
    }

    newEmpty(): TaskList {
        const t =  new TaskList();
        t.tasks = [new Task('123', '123', 3, 0)]
        return t;
    }
}
