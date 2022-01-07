import { Calendar, defaultCalendarStrings } from "@fluentui/react";
import React = require("react");

export interface ICalendarProps {
  examDate: Date;
  setExamDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function CalendarInlineOverlaidMonth(props: ICalendarProps){
    //var deCalendar : ICalendarStrings;
    //deCalendar.months = {Janua}
  
    return (
      <div style={{ height: "360px" }}>
        
        <Calendar
          //showGoToToday
          onSelectDate={props.setExamDate}
          value={props.examDate}
          // Calendar uses English strings by default. For localized apps, you must override this prop.
          strings={defaultCalendarStrings}
        />
        <div>Gewähltes Datum: {props.examDate?.toLocaleDateString("de-De") || "Not set"}</div>
      </div>
    );
  };
  
  