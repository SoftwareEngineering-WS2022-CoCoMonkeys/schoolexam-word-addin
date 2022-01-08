
import { DefaultButton, PrimaryButton, TextField } from "@fluentui/react";
import * as React from "react";
import "./PageFooter.scss";
import { getQrCodeBase64 } from "./structuralUtil";

export default function PageFooter() {
  const [footerText, setFooterText] = React.useState("      ");
  
  const onChangeFooterTextFieldValue = React.useCallback(
    (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setFooterText("      " + newValue || '');
    },
    [],
  );

  return (
    <div className="centerTopPadding">
      <TextField label="Fußzeilentext" placeholder="z.B. das Thema des Tests" onChange={onChangeFooterTextFieldValue} />
      <br></br>
      <PrimaryButton text="Fußzeile erstellen" id="footerCreate" onClick={() => _createFooter(footerText)} />
    </div>);
};

function _createFooter(footerText): void {
  Word.run(async (context) => {
    const footer = context.document.sections.getFirst().getFooter(Word.HeaderFooterType.primary);
    footer.clear();

    const paragraph = footer.insertParagraph(footerText, Word.InsertLocation.end);
    const qrCode = getQrCodeBase64();
    footer.insertInlinePictureFromBase64(qrCode, Word.InsertLocation.start);
    const firstPicture = footer.inlinePictures.getFirstOrNullObject();
    firstPicture.height = 30;
    paragraph.font.bold = true;
    paragraph.alignment = Word.Alignment.left;


    let sXml = '<pkg:package xmlns:pkg="http://schemas.microsoft.com/office/2006/xmlPackage"><pkg:part pkg:name="/_rels/.rels" pkg:contentType="application/vnd.openxmlformats-package.relationships+xml" pkg:padding="512"><pkg:xmlData><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships></pkg:xmlData></pkg:part><pkg:part pkg:name="/word/document.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"><pkg:xmlData><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> Page </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:noProof/></w:rPr><w:t>1</w:t></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p></w:body></w:document></pkg:xmlData></pkg:part></pkg:package>';
    let hdr = context.document.sections.getFirst()
        .getFooter("Primary"); //returns Word.Body type
    var pageNumber = hdr.insertOoxml(sXml, Word.InsertLocation.end);

    //console.log("XML: " + sXml);
    //pageNumber.
    await context.sync();
  });
}