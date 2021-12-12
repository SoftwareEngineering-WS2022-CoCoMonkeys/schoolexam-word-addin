import {Task} from "../model/Task";
import {TaskList} from "../model/TaskList";

/* global document, Office, Word */

const runBtn = document.getElementById("run") as HTMLButtonElement;
const createFrontPageBtn = document.getElementById("frontPageCreate") as HTMLButtonElement;
const createHeaderBtn = document.getElementById("headerCreate") as HTMLButtonElement;
const createFooterBtn = document.getElementById("footerCreate") as HTMLButtonElement;
const createTaskBtn = document.getElementById("create-task-btn") as HTMLButtonElement;
const maxPointsInput = document.getElementById("points-input") as HTMLInputElement;
const appBody = document.getElementById("app-body") as HTMLBodyElement;
const resetTasksBtn = document.getElementById("reset-tasks-btn") as HTMLButtonElement;

let taskList: TaskList = undefined;

Office.onReady((info) => {
    if (info.host === Office.HostType.Word) {
        appBody.style.display = "flex";
        runBtn.onclick = run;
        createTaskBtn.onclick = createTask;
        resetTasksBtn.onclick = resetTasks;
        createFooterBtn.onclick = createFooter;
        createHeaderBtn.onclick = createHeader;
        createFrontPageBtn.onclick = createFrontPage;
        Word.run(async (context) => {
            // Initialize task list
            taskList = await TaskList.load(context);
        });
    }
});

export async function createFrontPage() {
    return Word.run(async (context) => {
        var firstParagraph = context.document.body.paragraphs.getFirst();

        firstParagraph.font.set({
                                    bold: true,
                                });

        //const paragraph = context.document.body.insertParagraph("FRONT PAGE" + String(Date()), Word.InsertLocation.start);

        context.document.body.getHtml()
        const paragraph = context.document.body.insertHtml(
            "<br> <div style='text-align:center'>FRONT PAGE</div> <br> FRONT <br> FROAAANT" + String(
                Date()),
            Word.InsertLocation.start
        );


        // change the paragraph color to blue.
        paragraph.font.color = "black";

        await context.sync();
    });
}

export async function createHeader() {
    return Word.run(async (context) => {
        const sections = context.document.sections;
        const header = sections.getFirst()
                               .getHeader(Word.HeaderFooterType.primary);
        header.clear();
        // eslint-disable-next-line prettier/prettier
        const paragraph = header.insertParagraph(
            "Name: _______________________     Datum: _______________________",
            Word.InsertLocation.end
        );

        paragraph.font.bold = true;
        paragraph.alignment = Word.Alignment.right;

        await context.sync();
    });
}

export function getQrCodeBase64() {
    return "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"
}

export function base64ToDataUri(base64) {
    return 'data:image/png;base64,' + base64;
}

export async function createFooter() {
    return Word.run(async (context) => {
        const sections = context.document.sections;
        const footer = sections.getFirst()
                               .getFooter(Word.HeaderFooterType.primary);
        footer.clear();
        const paragraph = footer.insertParagraph(
            "            " + String(Date()),
            Word.InsertLocation.end
        );
        footer.insertInlinePictureFromBase64(
            getQrCodeBase64(),
            Word.InsertLocation.start
        )
        paragraph.font.bold = true;
        paragraph.alignment = Word.Alignment.left;

        await context.sync();
    });
}

export async function run() {
    return Word.run(async (context) => {
        /**
         * Insert your Word code here
         */

            // insert a paragraph at the end of the document.
        const paragraph = context.document.body.insertParagraph(
                "Hello World modified",
                Word.InsertLocation.end
            );

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

        const newTask = new Task(
            globalTaskId,
            globalTaskId,
            parseInt(maxPoints),
            cc
        );

        taskList.addTask(newTask);

        // No need to wait for saving
        await taskList.save(context);

        await context.sync();
    });
}

export async function resetTasks() {
    return Word.run(async (context) => {
        taskList.clear(context);
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
