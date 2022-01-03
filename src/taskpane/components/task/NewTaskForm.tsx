import * as React from "react";
import { CommandBarButton, IIconProps, PrimaryButton, Stack, Text, TextField } from "@fluentui/react";

export interface NewTaskFormProps {
  addTask: (maxPoints: number) => void;
}

export interface NewTaskFormState {
  expanded: boolean;
  pointsInput: number | null;
}

export default class NewTaskForm extends React.Component<NewTaskFormProps, NewTaskFormState> {
  // Render-only attributes
  private readonly addIcon: IIconProps = { iconName: "Add" };
  private readonly backIcon: IIconProps = { iconName: "Back" };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      pointsInput: null,
    };
  }

  render() {
    return (
      <div>
        {this.state.expanded ? (
          <div>
            <CommandBarButton iconProps={this.backIcon} text="Abbrechen" onClick={this.collapse} />
            <Text block>Vorgehen:</Text>
            <ul>
              <li>Erstelle die Aufgabe</li>
              <li>Markiere den (Teil-)Aufgabenbereich</li>
              <li>Lege die Maximalpunktzahl für die Aufgabe fest</li>
              <li>Fertig!</li>
            </ul>
            <Stack>
              <TextField label="Punkte" type="number" onChange={this.onPointsInputChanged} />
              <PrimaryButton onClick={this.onTaskAdded}>Aufgabe hinzufügen</PrimaryButton>
            </Stack>
          </div>
        ) : (
          <CommandBarButton iconProps={this.addIcon} text="Neue Aufgabe" onClick={this.expand} />
        )}
      </div>
    );
  }

  // Handler functions
  private expand = () => this.setState({ expanded: true });

  private collapse = () => this.setState({ expanded: false });

  private onPointsInputChanged = (event) => this.setState({ pointsInput: parseInt(event.target.value) });

  private onTaskAdded = () => {
    this.props.addTask(this.state.pointsInput);
    this.collapse();
  };
}
