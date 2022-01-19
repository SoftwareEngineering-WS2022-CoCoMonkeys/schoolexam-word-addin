import { Calendar } from "@fluentui/react";
import * as React from "react";

/**
 * Properties of {@link CalendarInlineOverlaidMonth}
 */
export interface CalendarProps {
  /** The  exam date */
  examDate: Date;
  /** Set the exam date */
  setExamDate: (date: Date) => void;
}

/**
 * React component that lets the user pick a date using German localization.
 * @component
 * @param props The component properties
 */
export default function CalendarInlineOverlaidMonth(props: CalendarProps): JSX.Element {
  const germanCalendarStrings = {
    goToToday: "",
    prevMonthAriaLabel: "Vorheriger Monat",
    months: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],
    shortMonths: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    days: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
    shortDays: ["M", "D", "M", "D", "F", "S", "S"],
  };

  return (
    <div style={{ height: "360px" }}>
      <Calendar onSelectDate={props.setExamDate} value={props.examDate} strings={germanCalendarStrings} />
      <div>Gewähltes Datum: {props.examDate?.toLocaleDateString("de-De") || "Not set"}</div>
    </div>
  );
}
