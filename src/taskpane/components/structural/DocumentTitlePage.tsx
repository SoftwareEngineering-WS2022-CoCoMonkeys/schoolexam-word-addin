/* eslint-disable no-undef */
import { DefaultButton } from "@fluentui/react";
// @ts-ignore
import * as React from "react";
import "./DocumentTitlePage.scss";

export interface DocumentTitlePageProps {}

export default class DocumentTitlePage extends React.Component<DocumentTitlePageProps, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return <DefaultButton text="Titelseite erstellen" id="frontPageCreate" onClick={_createFrontPage} />;
  }
}

function _createFrontPage(): void {
  Word.run(async (context) => {
    var firstParagraph = context.document.body.paragraphs.getFirst();

    firstParagraph.font.set({
      bold: true,
    });

    context.document.body.getHtml();
    const paragraph = context.document.body.insertHtml(
      "<br>  <div style='text-align:center'>FRONT PAGE</div> <br>  <br> " + String(Date() + "<br> <br>"),
      Word.InsertLocation.start
    );
    // change the paragraph color to blue.
    paragraph.font.color = "black";

    await context.sync();
  });
}
