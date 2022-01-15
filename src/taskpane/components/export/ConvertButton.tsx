import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import PdfService from "../services/PdfService";
import "./ConvertButton.scss";
import useTasks from "../state/TaskStore";
import usePrep from "../state/PreparationStore";
import ConvertDownloadButton from "./ConvertDownloadButton";

enum ConversionState {
  idle,
  waiting,
  error,
  success,
}

export default function ConvertButton(_props: unknown): JSX.Element {
  const [conversionState, setConversionState] = useState(ConversionState.idle);
  const [prepState, prepActions] = usePrep();
  const [taskState, taskActions] = useTasks();

  async function convertToPdf() {
    setConversionState(ConversionState.waiting);

    // remove and re-insert linkContentControls
    await taskState.taskList.removeLinkContentControlsAsync();
    await taskState.taskList.insertLinkContentControlsAsync();

    // get pdf
    try {
      const pdfBase64: string = await PdfService.getDocument();
      prepActions.setTaskPdf(pdfBase64);
      setConversionState(ConversionState.success);
    } catch (e) {
      console.error("PDF conversion failed with error:", e);
      setConversionState(ConversionState.error);
    } finally {
      // remove link content controls
      await taskState.taskList.removeLinkContentControlsAsync();
    }
  }

  const errorDialogContentProps = {
    type: DialogType.normal,
    title: "Konvertierung gescheitert",
    subText:
      "Die Konvertierung zu PDF ist fehlgeschlagen. Eventuell kann ein Neustart des Add-Ins diesen Fehler beheben.",
  };

  return (
    <div>
      <Dialog
        hidden={conversionState !== ConversionState.error}
        onDismiss={() => setConversionState(ConversionState.idle)}
        dialogContentProps={errorDialogContentProps}
      >
        <DialogFooter>
          <DefaultButton onClick={() => setConversionState(ConversionState.idle)} text="Ok" />
        </DialogFooter>
      </Dialog>
      <PrimaryButton id="convert-btn" className="margin-right1" onClick={convertToPdf}>
        {conversionState === ConversionState.waiting ? <Spinner /> : "Konvertieren"}
      </PrimaryButton>
    </div>
  );
}
