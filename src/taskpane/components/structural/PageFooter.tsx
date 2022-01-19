import { PrimaryButton, Stack } from "@fluentui/react";
import * as React from "react";
import { useQrCode } from "../state/DocumentStore";

/**
 * React component that lets the user create a footer for the document.
 * @component
 */
export default function PageFooter(_props: unknown): JSX.Element {
  const [, qrCodeActions] = useQrCode();

  return (
    <Stack
      className="stretch"
      horizontal={false}
      horizontalAlign="center"
      verticalAlign="center"
      tokens={{ childrenGap: 20 }}
    >
      <PrimaryButton
        text="Fußzeile erstellen (inkl. QR-Code)"
        id="footerCreate"
        onClick={() => qrCodeActions.createFooter()}
      />
    </Stack>
  );
}
1;
