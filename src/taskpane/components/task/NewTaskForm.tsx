import * as React from "react";
import { ActionButton, CommandBarButton, IIconProps, PrimaryButton, Stack, Text, TextField } from "@fluentui/react";
import BackButton from "../util/BackButton";
import { useState } from "react";

export interface NewTaskFormProps {
  addTask: (maxPoints: number) => void;
}

export default function NewTaskForm(props: NewTaskFormProps) {
  const [expanded, setExpanded] = useState(false);
  const [pointsInput, setPointsInput] = useState(null);

  const addIcon: IIconProps = { iconName: "Add" };

  return (
    <div>
      {expanded ? (
        <div>
          <BackButton onBack={() => setExpanded(false)} />
          <Text block>Vorgehen:</Text>
          <ul>
            <li>Erstelle die Aufgabe</li>
            <li>Markiere den (Teil-)Aufgabenbereich</li>
            <li>Lege die Maximalpunktzahl für die Aufgabe fest</li>
            <li>Fertig!</li>
          </ul>
          <Stack>
            <TextField
              label="Punkte"
              type="number"
              onChange={(event) => setPointsInput(parseInt(event.currentTarget.value))}
            />
            <PrimaryButton className="margin-btn" onClick={() => props.addTask(pointsInput)}>
              Aufgabe hinzufügen
            </PrimaryButton>
          </Stack>
        </div>
      ) : (
        <ActionButton
          iconProps={addIcon}
          text="Neue Aufgabe"
          className="margin-btn"
          onClick={() => setExpanded(true)}
        />
      )}
    </div>
  );
}
