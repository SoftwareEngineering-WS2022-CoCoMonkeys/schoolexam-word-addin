import { PrimaryButton, Stack, TextField } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import { useQrCode } from "../state/DocumentStore";

export default function PageHeader(): JSX.Element {
  const [qrCodeState, qrCodeActions] = useQrCode();
  const [headerText, setHeaderText] = useState("");

  return (
    <Stack
      className="stretch"
      horizontal={false}
      horizontalAlign="center"
      verticalAlign="center"
      tokens={{ childrenGap: 20 }}
    >
      <TextField
        label="Kopfzeilentext"
        className="stretch"
        placeholder="z.B. das Datum"
        onChange={(_, newValue) => setHeaderText(newValue)}
      />
      <PrimaryButton text="Kopfzeile erstellen" id="headerCreate" onClick={() => qrCodeActions.createHeader()} />
    </Stack>
  );
}
