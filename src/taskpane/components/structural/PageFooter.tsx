import { PrimaryButton, TextField } from "@fluentui/react";
import * as React from "react";
import "./PageFooter.scss";
import { getQrCodeBase64 } from "./StructuralUtil";
import usePrep from "../state/PreparationStore";
import RangeLocation = Word.RangeLocation;
import ContentControlAppearance = Word.ContentControlAppearance;

export default function PageFooter(_props: unknown): JSX.Element {
  const [footerText, setFooterText] = React.useState("      ");
  const [prepState, prepActions] = usePrep();

  const onChangeFooterTextFieldValue = React.useCallback(
    (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setFooterText("      " + newValue || "");
    },
    []
  );

  function createFooter(): Promise<void> {
    return Word.run(async (context) => {
      const footer = context.document.sections.getFirst().getFooter(Word.HeaderFooterType.primary);
      footer.clear();

      const contentControl = footer.getRange(RangeLocation.start).insertContentControl();
      contentControl.appearance = ContentControlAppearance.boundingBox;
      contentControl.tag = "footer-qr-code";
      contentControl.title = "footer-qr-code";

      // Warning: setting cannot edit breaks this content control

      await context.sync();

      const qrCode = getQrCodeBase64();
      // we CANNOT use the InlinePicture returned from this method as working with it leads to a GeneralException
      contentControl.insertInlinePictureFromBase64(qrCode, Word.InsertLocation.start);
      const qrCodePicture = contentControl.inlinePictures.getFirst();
      await context.sync();
      qrCodePicture.hyperlink = "http://pageQrCode";
      qrCodePicture.height = 30;

      // persist footer QR Code id
      contentControl.load("id");
      await context.sync();
      await prepActions.setFooterQrCodeCcId(contentControl.id);
    });
  }

  // TODO footer text
  return (
    <div className="centerTopPadding">
      <TextField label="Fußzeilentext" placeholder="z.B. das Thema des Tests" onChange={onChangeFooterTextFieldValue} />
      <br></br>
      <PrimaryButton text="Fußzeile erstellen" id="footerCreate" onClick={() => createFooter()} />
    </div>
  );
}
