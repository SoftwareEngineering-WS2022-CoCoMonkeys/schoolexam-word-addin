import { PrimaryButton, TextField } from "@fluentui/react";
import * as React from "react";
import "./PageFooter.scss";
import { useQrCode } from "../state/DocumentStore";

export default function PageFooter(_props: unknown): JSX.Element {
  const [footerText, setFooterText] = React.useState("      ");
  const [qrCodeState, qrCodeActions] = useQrCode();

  // TODO footer text
  return (
    <div className="centerTopPadding">
      <TextField
        label="Fußzeilentext"
        placeholder="z.B. das Thema des Tests"
        onChange={(_, newValue) => setFooterText("      " + newValue)}
      />
      <br />
      <PrimaryButton text="Fußzeile erstellen" id="footerCreate" onClick={() => qrCodeActions.createFooter()} />
    </div>
  );
}
