import * as React from 'react';
import { Announced } from '@fluentui/react/lib/Announced';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { Text } from '@fluentui/react/lib/Text';

const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px',
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

export interface IInstrutctionListItem {
  key: number;
  name: string;
}

export interface IInstrutctionListState {
  items: IInstrutctionListItem[]
}

export class InstrutctionList extends React.Component<{}, IInstrutctionListState> {
  private _allItems: IInstrutctionListItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);


    // Populate with items for demos.
    this._allItems = [];
    const instructions = [
        "1. Erstelle die Aufgabe",
        "2. Markiere den (Teil-)Aufgabenbereich",
        "3. Lege die Maximalpunktzahl für die Aufgabe fest",
        "4. Fertig!",
    ]
    for (let i = 0; i < instructions.length; i++) {
      this._allItems.push({
        key: i + 1,
        name:  instructions[i]
      });
    }

    this._columns = [
        { key: 'column1', name: 'Vorgehen', fieldName: 'name', minWidth: 300, maxWidth: 400, isResizable: true },
    ];

    this.state = {
      items: this._allItems
    };
  }

  public render(): JSX.Element {
    const { items} = this.state;

    return (
      <div>
        <DetailsList
            items={items}
            columns={this._columns}
            selectionMode={SelectionMode.none} 
            layoutMode={DetailsListLayoutMode.justified}
        />
      </div>
    );
  }
}