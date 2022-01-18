import { PrimaryButton } from "@fluentui/react";
import * as React from "react";
import "./PageHeader.scss";
import { useQrCode } from "../state/DocumentStore";

export default function PageHeader(): JSX.Element {
  const [qrCodeState, qrCodeActions] = useQrCode();

  return (
    <div className="centerTopPadding">
      <PrimaryButton text="Kopfzeile erstellen" id="headerCreate" onClick={() => qrCodeActions.createHeader()} />
    </div>
  );
}
