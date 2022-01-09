import * as React from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from "@fluentui/react/lib/DetailsList";

export default function InstrutctionList() {
  const instructions = [
    "1. Erstelle die Aufgabe",
    "2. Markiere den (Teil-)Aufgabenbereich",
    "3. Lege die Maximalpunktzahl für die Aufgabe fest",
    "4. Fertig!",
  ].map((instr) => ({ name: instr }));

  const columns: IColumn[] = [
    { key: "column1", name: "Vorgehen", fieldName: "name", minWidth: 300, maxWidth: 400, isResizable: true },
  ];

  return (
    <div id="newTaskInstructionList">
      <DetailsList
        items={instructions}
        columns={columns}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
      />
    </div>
  );
}
