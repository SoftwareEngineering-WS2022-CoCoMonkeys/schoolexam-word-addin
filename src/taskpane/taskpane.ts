import { Task } from "../model/Task";
import { TaskList } from "../model/TaskList";

/* global document, Office, Word */

const runBtn = document.getElementById("run") as HTMLButtonElement;
const createTaskBtn = document.getElementById("create-task-btn") as HTMLButtonElement;
const maxPointsInput = document.getElementById("points-input") as HTMLInputElement;
const appBody = document.getElementById("app-body");

let taskList: TaskList = undefined;

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    appBody.style.display = "flex";
    runBtn.onclick = run;
    createTaskBtn.onclick = createTask;
    Word.run(async (context) => {
      // Initialize task list
      taskList = await TaskList.load(context);
    });
  }
});

export async function run() {
  return Word.run(async (context) => {
    // insert a paragraph at the end of the document.
    const paragraph = context.document.body.insertParagraph("Hello World modified", Word.InsertLocation.end);

    // change the paragraph color to blue.
    paragraph.font.color = "blue";

    await context.sync();
  });
}

export async function createTask() {
  return Word.run(async (context) => {
    // Validate points input
    let maxPoints = maxPointsInput.value;
    if (!maxPoints || isNaN(parseInt(maxPoints))) {
      shake(document.getElementById("points-input-error"));
      return;
    } else {
      //Reset input field
      maxPointsInput.value = "";
    }

    // Get the current selection
    const range = context.document.getSelection();

    // Create a content control
    const cc = range.insertContentControl();

    // Visually signal content control creation
    cc.appearance = Word.ContentControlAppearance.boundingBox;

    // Associate ID with content control
    const globalTaskId = new Date().getMilliseconds() % 123523;
    cc.title = "Task " + globalTaskId;
    cc.tag = "Task";

    const newTask = new Task(globalTaskId, globalTaskId, parseInt(maxPoints), cc);

    taskList.addTask(newTask);

    // No need to wait for saving
    taskList.save(context);

    await context.sync();
  });
}

function shake(element: HTMLElement) {
  element.classList.add("shake-anim");
  setTimeout(() => {
    element.classList.remove("shake-anim");
  }, 300);
}

/* Log Task list for debugging purposes */
setInterval(() => console.log(taskList), 2000);
