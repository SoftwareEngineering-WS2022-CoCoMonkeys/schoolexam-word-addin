import * as React from 'react';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList';



const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

export interface IInstrutctionListItem {
  key: number;
  name: string;
}

export interface IInstrutctionListProps {
  items: IInstrutctionListItem[]
}

export default function InstrutctionList() {
  var allItems: IInstrutctionListItem[];
  var columns: IColumn[];
  
  allItems = [];
  const instructions = [
    "1. Erstelle die Aufgabe",
    "2. Markiere den (Teil-)Aufgabenbereich",
    "3. Lege die Maximalpunktzahl für die Aufgabe fest",
    "4. Fertig!",
  ]
  for (let i = 0; i < instructions.length; i++) {
    allItems.push({
      key: i + 1,
      name:  instructions[i]
    });
  }
  
  const [items, setItems] = React.useState(allItems);
  
  columns = [
      { key: 'column1', name: 'Vorgehen', fieldName: 'name', minWidth: 300, maxWidth: 400, isResizable: true },
  ];

  console.log(allItems);
  console.log(items);

  return (
    <div id="newTaskInstructionList">
      <DetailsList
          items={items}
          columns={columns}
          selectionMode={SelectionMode.none} 
          layoutMode={DetailsListLayoutMode.justified}
      />
    </div>
  );
}

