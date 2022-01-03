/* eslint-disable no-undef */
import { DefaultButton } from "@fluentui/react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from "react";
import "./PageHeader.scss";

export default class PageHeader extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return <DefaultButton text="Kopfzeile erstellen" id="headerCreate" onClick={_createPageHeader} />;
  }
}

function _createPageHeader(): void {
  Word.run(async (context) => {
    const sections = context.document.sections;
    const header = sections.getFirst().getHeader(Word.HeaderFooterType.primary);
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
