import {Task} from "./Task";
import WordPersistable from "./WordPersistable";

export default class TaskList extends WordPersistable<TaskList> {
    tasks: Task[];

    propertyKey = "task-data"

    constructor() {
        super();
        this.tasks = [];
    }

    getTasks(): Task[] {
        return this.tasks
    }


    addTaskFromSelection(maxPoints: number, callback: (taskList: TaskList) => void): void {
        Word.run(async context => {
            // Get the current selection
            const range = context.document.getSelection();

            // Create a content control
            const cc = range.insertContentControl();

            // Visually signal content control creation
            cc.appearance = Word.ContentControlAppearance.boundingBox;

            // Associate ID with content control
            //TODO get proper ID
            const globalTaskId = new Date().getMilliseconds() % 123523;

            cc.title = "Task " + globalTaskId;
            cc.tag = "Task";

            // Need to load ID property first
            cc.load("id")

            await context.sync();

            const newTask = new Task(globalTaskId, globalTaskId, maxPoints, cc.id);

            this.addTask(newTask);

            await this.save(context);

            await context.sync();

            // Execute caller-supplied functions
            callback(this)
        })
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
        if (value["localTaskId"] != null) {
            // @ts-ignore
            return Object.assign(new Task(), value);
        }
        return value;
    }

    newEmpty(): TaskList {
        const t = new TaskList();
        t.tasks = [new Task('123', '123', 3, 0)]
        return t;
    }
}
