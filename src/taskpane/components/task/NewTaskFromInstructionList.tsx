import * as React from "react";
import { Text } from "@fluentui/react";
import "./NewTaskFromInstructionList.scss";

export default function InstructionList(): JSX.Element {
  return (
    <div>
      <ul>
        <li>Erstelle die Aufgabe</li>
        <li>Markiere den (Teil-)Aufgabenbereich</li>
        <li>Lege die Maximalpunktzahl für die Aufgabe fest</li>
        <li>Fertig!</li>
      </ul>
    </div>
  );
}
