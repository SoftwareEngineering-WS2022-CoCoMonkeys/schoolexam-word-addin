import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import PdfService from "../services/PdfService";
import TaskList from "../../../word/TaskList";
import "./ConvertButton.scss";

export interface ConvertButtonProps {
  taskList: TaskList;
  taskPdf: string | null;
  setTaskPdf: (templatePdf: string) => void;
}

enum ConversionState {
  idle,
  converting,
  error,
  success,
}

export default function ConvertButton(props: ConvertButtonProps): JSX.Element {
  const [conversionState, setConversionState] = useState(ConversionState.idle);

  async function convertToPdf() {
    setConversionState(ConversionState.converting);

    // remove and re-insert linkContentControls
    await props.taskList.removeLinkContentControlsAsync();
    await props.taskList.insertLinkContentControlsAsync();

    // get pdf
    try {
      const pdfBase64: string = await PdfService.getDocument();
      props.setTaskPdf(pdfBase64);
      setConversionState(ConversionState.success);
    } catch (e) {
      console.error("PDF conversion failed with error:", e);
      setConversionState(ConversionState.error);
    } finally {
      // remove link content controls
      await props.taskList.removeLinkContentControlsAsync();
    }
  }

  const errorDialogContentProps = {
    type: DialogType.normal,
    title: "Konvertierung gescheitert",
    subText:
      "Die Konvertierung zu PDF ist fehlgeschlagen. Eventuell kann ein Neustart des Add-Ins diesen Fehler beheben.",
  };

  return (
    <div id="convert-btns-container">
      <Dialog
        hidden={conversionState !== ConversionState.error}
        onDismiss={() => setConversionState(ConversionState.idle)}
        dialogContentProps={errorDialogContentProps}
      >
        <DialogFooter>
          <DefaultButton onClick={() => setConversionState(ConversionState.idle)} text="Ok" />
        </DialogFooter>
      </Dialog>
      <div className="row-flex">
        <PrimaryButton id="convert-btn" className="margin-btn" onClick={convertToPdf}>
          {conversionState === ConversionState.converting ? <Spinner /> : "Konvertieren"}
        </PrimaryButton>

        {props.taskPdf != null ? (
          <a id="download-anchor" download="exam.pdf" href={`data:application/pdf;base64,${props.taskPdf}`}>
            <PrimaryButton id="download-btn" className="margin-btn">
              Download
            </PrimaryButton>
          </a>
        ) : (
          <PrimaryButton id="download-btn" disabled={true} className="margin-btn">
            Download
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}
