import { PrimaryButton, TextField } from "@fluentui/react";
import * as React from "react";
import "./PageHeader.scss";

export default function PageHeader() {
  const [headerText, setFooterText] = React.useState(
    "Name: _______________________     Datum: _______________________"
  );

  const onChangeFooterTextFieldValue = React.useCallback(
    (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setFooterText("      " + newValue || "");
    },
    []
  );

  return (
    <div className="centerTopPadding">
      <TextField label="Kopfzeilentext" placeholder="z.B. Name und Datum" onChange={onChangeFooterTextFieldValue} />
      <br></br>
      <PrimaryButton text="Kopfzeile erstellen" id="headerCreate" onClick={() => _createPageHeader(headerText)} />
    </div>
  );
}

function _createPageHeader(headerText): void {
  Word.run(async (context) => {
    const sections = context.document.sections;
    const header = sections.getFirst().getHeader(Word.HeaderFooterType.primary);
    header.clear();
    // eslint-disable-next-line prettier/prettier
    const paragraph = header.insertParagraph(
      headerText,
      Word.InsertLocation.end,
    );

    paragraph.font.bold = true;
    paragraph.alignment = Word.Alignment.right;

    await context.sync();
  });
}
