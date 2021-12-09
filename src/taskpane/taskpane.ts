/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import { Task } from "../model/Task";
import { TaskList } from "../model/TaskList";

/* global document, Office, Word */

const runBtn = document.getElementById("run") as HTMLButtonElement;
const createTaskBtn = document.getElementById("create-task-btn") as HTMLButtonElement;
const maxPointsInput = document.getElementById("points-input") as HTMLInputElement;

let taskList: TaskList = undefined;

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("app-body").style.display = "flex";
    runBtn.onclick = run;
    createTaskBtn.onclick = createTask;
    Word.run(async (context) => {
      taskList = await TaskList.load(context);
    });
  }
});

export async function run() {
  return Word.run(async (context) => {
    /**
     * Insert your Word code here
     */

    // insert a paragraph at the end of the document.
    const paragraph = context.document.body.insertParagraph("Hello World modified", Word.InsertLocation.end);

    // change the paragraph color to blue.
    paragraph.font.color = "blue";

    await context.sync();
  });
}

export async function createTask() {
  return Word.run(async (context) => {
    // Check for points

    let maxPoints = maxPointsInput.value;

    if (!maxPoints || isNaN(parseInt(maxPoints))) {
      shake(document.getElementById("points-input-error"));
      return;
    }

    // Get the current selection
    const range = context.document.getSelection();

    // Create a content control
    const cc = range.insertContentControl();
    // Visually signal content control creation
    cc.appearance = Word.ContentControlAppearance.boundingBox;

    // Associate ID with content control
    const taskId = 1234;
    cc.title = "Task " + taskId;
    cc.tag = "Task";

    const newTask = new Task(taskId, parseInt(maxPointsInput.value), cc);
    maxPointsInput.value = "";

    taskList.addTask(newTask);
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
