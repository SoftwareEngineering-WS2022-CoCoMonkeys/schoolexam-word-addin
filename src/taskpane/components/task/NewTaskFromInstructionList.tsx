import * as React from "react";

/**
 * Instructions for the creation of a new task in the document.
 * @component
 */
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
