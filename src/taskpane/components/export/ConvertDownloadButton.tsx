import { PrimaryButton } from "@fluentui/react";
import * as React from "react";
import usePrep from "../state/PreparationStore";

export default function ConvertDownloadButton(_props: unknown): JSX.Element {
  const [prepState, prepActions] = usePrep();

  return prepState.taskPdf != null ? (
    <a id="download-anchor" download="exam.pdf" href={`data:application/pdf;base64,${prepState.taskPdf}`}>
      <PrimaryButton id="convert-download-btn">Download</PrimaryButton>
    </a>
  ) : (
    <PrimaryButton id="convert-download-btn" disabled={true}>
      Download
    </PrimaryButton>
  );
}
