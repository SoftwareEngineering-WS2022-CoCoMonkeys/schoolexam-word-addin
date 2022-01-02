import * as React from "react";
import {BaseButton, CommandBarButton, IIconProps, PrimaryButton, Stack, TextField, Text, List} from "@fluentui/react";


export interface NewTaskFormProps {

}

export interface NewTaskFormState {
    expanded: boolean;
}

export default class NewTaskForm extends React.Component<NewTaskFormProps, NewTaskFormState> {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    onTaskAdded(event) { //TODO type
        event.preventDefault();
    }

    // Handler functions
    private expand = () => this.setState({expanded: true});
    private collapse = () => this.setState({expanded: false});


    // Render-only attributes
    private readonly addIcon: IIconProps = {iconName: 'Add'};
    private readonly backIcon: IIconProps = {iconName: 'Back'};

    render() {

        return (
            <div>
                {this.state.expanded ?
                 <div>
                     <CommandBarButton
                         iconProps={this.backIcon}
                         text="Abbrechen"
                         onClick={this.collapse}
                     />
                     <Text block>Vorgehen:</Text>
                     <ul>
                         <li>Erstelle die Aufgabe</li>
                         <li>Markiere den (Teil-)Aufgabenbereich</li>
                         <li>Lege die Maximalpunktzahl für die Aufgabe fest</li>
                         <li>Fertig!</li>
                     </ul>
                     <Stack>
                         <TextField
                             label="Punkte"/>
                         <PrimaryButton
                             onClick={this.onTaskAdded}>
                             Aufgabe hinzufügen
                         </PrimaryButton>
                     </Stack>
                 </div> :
                 <CommandBarButton
                     iconProps={this.addIcon}
                     text="Neue Aufgabe"
                     onClick={this.expand}
                 />}
            </div>
        );
    }
}