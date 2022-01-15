import { PrimaryButton, TextField } from "@fluentui/react";
import * as React from "react";
import "./DocumentTitlePage.scss";
import { getTitlePlaceHolderBase64 } from "./StructuralUtil";
import CalendarInlineOverlaidMonth from "./Calendar";
import usePrep from "../state/PreparationStore";
import ContentControlAppearance = Word.ContentControlAppearance;

export default function DocumentTitlePage(_props: unknown): JSX.Element {
  const [examDate, setExamDate] = React.useState(new Date());
  const defaultCourseName = "Mathematik Klasse 8a";
  const [courseName, setCourseName] = React.useState(defaultCourseName);
  const defaultExamTitle = "1. Schulaufgabe";
  const [examTitle, setExamTitle] = React.useState(defaultExamTitle);
  const [prepState, prepActions] = usePrep();

  const onChangeExamNameTextFieldValue = React.useCallback(
    (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setExamTitle(newValue || "");
    },
    []
  );
  const onChangeCourseNameTextFieldValue = React.useCallback(
    (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setCourseName(newValue || "");
    },
    []
  );

  function createFrontPage(_examDate: Date, _courseName, _examName) {
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
        const contentControl = leftSide.body.insertContentControl();
        contentControl.appearance = ContentControlAppearance.boundingBox;
        contentControl.tag = "title-qr-code";
        contentControl.title = "title-qr-code";

        // Warning: setting cannot edit breaks this content control

        contentControl.insertInlinePictureFromBase64(getTitlePlaceHolderBase64(), Word.InsertLocation.start);
        contentControl.inlinePictures.getFirst().hyperlink = "http://studentQrCode";

        const rightSide = table.getCell(0, 1);
        rightSide.columnWidth = 400;

        rightSide.body.insertHtml(headerHtml, Word.InsertLocation.start);

        rightSide.body.font.set({
          bold: true,
          size: 15,
        });

        await context.sync();

        // persist title QR Code id
        contentControl.load("id");
        await context.sync();
        await prepActions.setTitleQrCodeCcId(contentControl.id);
      }
    });
  }

  return (
    <div className="centerTopPadding">
      <TextField
        label="Name des Leistungsnachweises"
        placeholder={`z.B.: ${defaultExamTitle}`}
        onChange={onChangeExamNameTextFieldValue}
      />
      <TextField
        label="Kursname"
        placeholder={`z.B.: ${defaultCourseName}`}
        onChange={onChangeCourseNameTextFieldValue}
      />
      <br></br>
      <CalendarInlineOverlaidMonth examDate={examDate} setExamDate={setExamDate} />
      <PrimaryButton
        text="Titelseite erstellen"
        id="create-front-page-btn"
        onClick={() => createFrontPage(examDate, courseName, examTitle)}
      />
    </div>
  );
}
