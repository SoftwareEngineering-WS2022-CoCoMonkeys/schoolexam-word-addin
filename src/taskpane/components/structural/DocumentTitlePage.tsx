import {
  DefaultButton,
  Calendar,
  defaultCalendarStrings,
  ICalendarStrings,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import * as React from "react";
import "./DocumentTitlePage.scss";
import { getQrCodeBase64 } from "./structuralUtil";
import CalendarInlineOverlaidMonth from "./Calendar";

export default function DocumentTitlePage() {
  const [examDate, setExamDate] = React.useState(new Date());
  const [courseName, setCourseName] = React.useState("Mathematik Klasse 8a");
  const [examName, setExamName] = React.useState("1. Schulaufgabe");

  const onChangeExamNameTextFieldValue = React.useCallback(
    (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setExamName(newValue || "");
    },
    []
  );
  const onChangeCourseNameTextFieldValue = React.useCallback(
    (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setCourseName(newValue || "");
    },
    []
  );

  return (
    <div className="centerTopPadding">
      <TextField
        label="Name des Leistungsnachweises"
        placeholder="z.B.: 1. Schulaufgabe"
        onChange={onChangeExamNameTextFieldValue}
      />
      <TextField
        label="Kursname"
        placeholder="z.B.: Mathematik Klasse 8a"
        onChange={onChangeCourseNameTextFieldValue}
      />
      <br></br>
      <CalendarInlineOverlaidMonth examDate={examDate} setExamDate={setExamDate} />
      <PrimaryButton
        text="Titelseite erstellen"
        id="frontPageCreate"
        onClick={() => _createFrontPage(examDate, courseName, examName)}
      />
    </div>
  );
}

function _createFrontPage(_examDate: Date, _courseName, _examName) {
  const headerHtml =
    "<br> <div style='text-align:center'> <div style='font-size: x-large'>" +
    _examName +
    " </div> <br> <br> " +
    _courseName +
    " <br> " +
    String(_examDate.toLocaleDateString("de-De") + "</div><br> <br> <br>");

  Word.run(async (context) => {
    let tableParagraph = context.document.body.paragraphs.getFirst();
    // Word API bugs making access to the first element before a table element impossible
    // Null checks also not working here, therefore this unclean solution is the last possibility
    try {
      tableParagraph.parentTable.delete();
      await context.sync();
    } catch (e) {
      console.debug(e);
    } finally {
      tableParagraph = context.document.body.paragraphs.getFirst();
      const table = tableParagraph.insertTable(1, 2, Word.InsertLocation.before, null);
      table.getBorder(Word.BorderLocation.all).type = "None";

      const leftSide = table.getCell(0, 0);
      leftSide.columnWidth = 30;
      leftSide.setCellPadding(Word.CellPaddingLocation.bottom, 1);
      leftSide.body.insertInlinePictureFromBase64(getQrCodeBase64(), Word.InsertLocation.start);

      const rightSide = table.getCell(0, 1);
      rightSide.columnWidth = 400;

      rightSide.body.insertHtml(headerHtml, Word.InsertLocation.start);

      rightSide.body.font.set({
        bold: true,
        size: 15,
      });

      await context.sync();
    }
  });
}
