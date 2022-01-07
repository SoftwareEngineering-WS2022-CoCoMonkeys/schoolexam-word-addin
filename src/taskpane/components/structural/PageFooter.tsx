import { DefaultButton } from "@fluentui/react";

import * as React from "react";
import "./PageFooter.scss";
import { getQrCodeBase64 } from "./structuralUtil";

export default class PageFooter extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return <DefaultButton text="Fußzeile erstellen" id="footerCreate" onClick={_createFooter} />;
  }
}

function _createFooter(): void {
  Word.run(async (context) => {
    const footer = context.document.sections.getFirst().getFooter(Word.HeaderFooterType.primary);
    footer.clear();
    const paragraph = footer.insertParagraph("      " + String(Date()), Word.InsertLocation.end);
    const qrCode = getQrCodeBase64();
    footer.insertInlinePictureFromBase64(qrCode, Word.InsertLocation.start);
    const firstPicture = footer.inlinePictures.getFirstOrNullObject();
    firstPicture.height = 30;
    paragraph.font.bold = true;
    paragraph.alignment = Word.Alignment.left;

    await context.sync();
  });
}
