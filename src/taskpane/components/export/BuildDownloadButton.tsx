import { PrimaryButton } from "@fluentui/react";
import * as React from "react";
import usePrep from "../state/PreparationStore";
import "./BuildDownloadButton.scss";

export default function BuildDownloadButton(_props: unknown): JSX.Element {
  const [prepState, prepActions] = usePrep();

  return prepState.build != null ? (
    <a id="download-anchor" download="exam_built.pdf" href={`data:application/pdf;base64,${prepState.build.pdfFile}`}>
      <PrimaryButton id="build-download-btn">Download</PrimaryButton>
    </a>
  ) : (
    <PrimaryButton id="build-download-btn" disabled={true}>
      Download
    </PrimaryButton>
  );
}
