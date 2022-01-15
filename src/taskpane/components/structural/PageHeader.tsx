import { PrimaryButton } from "@fluentui/react";
import * as React from "react";
import "./PageHeader.scss";
import { getQrCodeBase64 } from "./StructuralUtil";
import usePrep from "../state/PreparationStore";
import RangeLocation = Word.RangeLocation;
import ContentControlAppearance = Word.ContentControlAppearance;
import InsertLocation = Word.InsertLocation;

export default function PageHeader(): JSX.Element {
  const [prepState, prepActions] = usePrep();

  function createPageHeader(): Promise<void> {
    return Word.run(async (context) => {
      const header = context.document.sections.getFirst().getHeader(Word.HeaderFooterType.primary);
      header.clear();

      const contentControl = header.getRange(RangeLocation.start).insertContentControl();
      contentControl.appearance = ContentControlAppearance.boundingBox;
      contentControl.tag = "header-qr-code-placeholder";
      contentControl.title = "header-qr-code-placeholder";

      // Warning: setting cannot edit breaks this content control

      await context.sync();

      const paragraph = contentControl.insertParagraph(">>>Platz für QR-Code<<<", InsertLocation.start);
      // change color to grey
      paragraph.font.set({
        color: "grey",
      });
      const qrCodePicture = contentControl.inlinePictures.getFirst();
      await context.sync();
      qrCodePicture.hyperlink = "http://pageQrCode";
      qrCodePicture.height = 30;

      // persist header QR Code id
      contentControl.load("id");
      await context.sync();
      await prepActions.setTitleQrCodeCcId(contentControl.id);
    });
  }

  return (
    <div className="centerTopPadding">
      <PrimaryButton text="Kopfzeile erstellen" id="headerCreate" onClick={createPageHeader} />
    </div>
  );
}
