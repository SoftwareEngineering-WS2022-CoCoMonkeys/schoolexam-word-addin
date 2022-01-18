import { PrimaryButton, Stack, TextField } from "@fluentui/react";
import * as React from "react";
import { useQrCode } from "../state/DocumentStore";

export default function PageFooter(_props: unknown): JSX.Element {
  const [footerText, setFooterText] = React.useState("      ");
  const [qrCodeState, qrCodeActions] = useQrCode();

  // TODO footer text
  return (
    <Stack
      className="stretch"
      horizontal={false}
      horizontalAlign="center"
      verticalAlign="center"
      tokens={{ childrenGap: 20 }}
    >
      <TextField
        label="Fußzeilentext"
        className="stretch"
        placeholder="z.B. das Thema des Tests"
        onChange={(_, newValue) => setFooterText("      " + newValue)}
      />
      <br />
      <PrimaryButton text="Fußzeile erstellen" id="footerCreate" onClick={() => qrCodeActions.createFooter()} />
    </Stack>
  );
}
