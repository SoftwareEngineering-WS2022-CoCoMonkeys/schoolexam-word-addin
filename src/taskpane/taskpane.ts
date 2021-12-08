/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, Word */

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
    document.getElementById("create-task-btn").onclick = createTask;
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
    // Get the current selection
    const range = context.document.getSelection();

    // Create a content control
    const cc = range.insertContentControl();

    // Visually signal content control creation
    cc.appearance = Word.ContentControlAppearance.boundingBox;
    cc.title = "DummyTask";
    cc.tag = "Task";

    // Associate ID with content control
    context.document.properties.customProperties.add(cc.title + "_ID", 12345);
    // Set points for task
    const input = (document.getElementById("points-input") as HTMLInputElement).value;
    // ... and save persistently in custom properties
    context.document.properties.customProperties.add(cc.title + "_MaxPoints", input);

    await context.sync();
  });
}
