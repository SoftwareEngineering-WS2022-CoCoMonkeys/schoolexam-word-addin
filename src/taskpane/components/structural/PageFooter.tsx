import { DefaultButton, PrimaryButton, TextField } from "@fluentui/react";
import * as React from "react";
import "./PageFooter.scss";
import { getQrCodeBase64 } from "./structuralUtil";

export default function PageFooter() {
  const [footerText, setFooterText] = React.useState("      ");

  const onChangeFooterTextFieldValue = React.useCallback(
    (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setFooterText("      " + newValue || "");
    },
    []
  );

  return (
    <div className="centerTopPadding">
      <TextField label="Fußzeilentext" placeholder="z.B. das Thema des Tests" onChange={onChangeFooterTextFieldValue} />
      <br></br>
      <PrimaryButton text="Fußzeile erstellen" id="footerCreate" onClick={() => _createFooter(footerText)} />
    </div>
  );
}

function _createFooter(footerText): void {
  Word.run(async (context) => {
    const footer = context.document.sections.getFirst().getFooter(Word.HeaderFooterType.primary);
    footer.clear();

    //context.document.sections.getFirst().getHeader().

    const paragraph = footer.insertParagraph(footerText, Word.InsertLocation.end);
    const qrCode = getQrCodeBase64();
    footer.insertInlinePictureFromBase64(qrCode, Word.InsertLocation.start);
    const firstPicture = footer.inlinePictures.getFirstOrNullObject();
    firstPicture.height = 30;
    paragraph.font.bold = true;
    paragraph.alignment = Word.Alignment.left;

    await context.sync();
  });
}
