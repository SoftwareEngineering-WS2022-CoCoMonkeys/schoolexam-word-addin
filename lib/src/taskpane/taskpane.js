/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
/* global document, Office, Word */
Office.onReady((info) => {
    if (info.host === Office.HostType.Word) {
        document.getElementById("sideload-msg").style.display = "none";
        document.getElementById("app-body").style.display = "flex";
        document.getElementById("frontPageCreate").onclick = createFrontPage;
        document.getElementById("headerCreate").onclick = createHeader;
        document.getElementById("footerCreate").onclick = createFooter;
        document.getElementById("run").onclick = run;
    }
});
export async function createFrontPage() {
    return Word.run(async (context) => {
        var firstParagraph = context.document.body.paragraphs.getFirst();
        firstParagraph.font.set({
            bold: true,
        });
        const paragraph = context.document.body.insertParagraph("createFrontPage", Word.InsertLocation.start);
        // change the paragraph color to blue.
        paragraph.font.color = "black";
        await context.sync();
    });
}
export async function createHeader() {
    return Word.run(async (context) => {
        const sections = context.document.sections;
        const header = sections.items[0].getHeader(Word.HeaderFooterType.primary);
        const paragraph = context.document.body.insertParagraph("aa", Word.InsertLocation.start);
        header.insertParagraph("header test", Word.InsertLocation.start);
        //const header = context.document.body.insertParagraph("header test", Word.HeaderFooterType.primary)
        //const header = context.document.contentControls.getByTag("header").getFirst();
        //header.insertText("Test", Word.InsertLocation.start);
        // insert a paragraph at the end of the document.   
        // change the paragraph color to blue.
        paragraph.font.color = "green";
        await context.sync();
    });
}
export async function createFooter() {
    return Word.run(async (context) => {
        /**
         * Insert your Word code here
         */
        // insert a paragraph at the end of the document.
        const paragraph = context.document.body.insertParagraph("createFrontPage", Word.InsertLocation.end);
        // change the paragraph color to blue.
        paragraph.font.color = "yellow";
        await context.sync();
    });
}
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
//# sourceMappingURL=taskpane.js.map