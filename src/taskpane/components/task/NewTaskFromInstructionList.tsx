import * as React from "react";
import { Text, MessageBar, MessageBarType } from "@fluentui/react";
import "./NewTaskFromInstructionList.scss";

export default function InstrutctionList() {
  return (
    <MessageBar messageBarType={MessageBarType.info} id="instruction-list">
      <Text id="instruction-title">Vorgehen</Text>
      <ul>
        <li>Erstelle die Aufgabe</li>
        <li>Markiere den (Teil-)Aufgabenbereich</li>
        <li>Lege die Maximalpunktzahl für die Aufgabe fest</li>
        <li>Fertig!</li>
      </ul>
    </MessageBar>
  );
}
