import { DefaultButton, Calendar, defaultCalendarStrings } from "@fluentui/react";
// @ts-ignore
import * as React from "react";
import "./DocumentTitlePage.scss";
import { getQrCodeBase64 } from "./structuralUtil";

export default class DocumentTitlePage extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CalendarInlineOverlaidMonthExample></CalendarInlineOverlaidMonthExample>
        <DefaultButton text="Titelseite erstellen" id="frontPageCreate" onClick={_createFrontPage} />
      </div>
    );
  }
}

function _createFrontPage(): void {
  Word.run(async (context) => {
    const firstParagraph = context.document.body.paragraphs.getFirst();

    firstParagraph.font.set({
      bold: true,
    });


    const tableParagraph = context.document.body.paragraphs.getFirst();

    var tableData = [
      ["Name", "ID"]
    ];
    var table = tableParagraph.insertTable(1, 2, Word.InsertLocation.after, null);
    table.getBorder(Word.BorderLocation.all).type = "None";

    var leftSide = table.getCell(0,0);
    leftSide.columnWidth = 30;
    leftSide.setCellPadding(Word.CellPaddingLocation.bottom, 1);
    leftSide.body.insertInlinePictureFromBase64(getQrCodeBase64(), Word.InsertLocation.start);
    
    var rightSide = table.getCell(0,1);
    rightSide.columnWidth = 400;
    rightSide.body.insertHtml(
      "<br>  <div style='text-align:center'>1. Schulaufgabe <br>  <br> " + String(Date() + "</div><br> <br>"),
      Word.InsertLocation.start
      );


    await context.sync();
  });
}



function _createFrontPageOld(): void {
  Word.run(async (context) => {
    const firstParagraph = context.document.body.paragraphs.getFirst();

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
    context.document.body.insertInlinePictureFromBase64(getQrCodeBase64(), Word.InsertLocation.start)
    

    await context.sync();
  });
}

export const CalendarInlineOverlaidMonthExample: React.FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <div style={{ height: "360px" }}>
      <div>Selected date: {selectedDate?.toLocaleString() || "Not set"}</div>
      <Calendar
        showGoToToday
        onSelectDate={setSelectedDate}
        value={selectedDate}
        // Calendar uses English strings by default. For localized apps, you must override this prop.
        strings={defaultCalendarStrings}
      />
    </div>
  );
};
