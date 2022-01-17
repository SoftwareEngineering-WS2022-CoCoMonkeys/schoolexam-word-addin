import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import PdfService from "../services/PdfService";
import "./ConvertButton.scss";
import useTasks from "../state/TaskStore";
import usePrep from "../state/PreparationStore";
import RequestStatus from "../state/RequestStatus";
import downloadFileBase64 from "../services/DownloadService";

export default function ConvertButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [taskState, taskActions] = useTasks();
  const [prepState, prepActions] = usePrep();

  // LOCAL STATE
  const [conversionStatus, setConversionStatus] = useState(RequestStatus.IDLE);

  async function convertToPdf() {
    setConversionStatus(RequestStatus.WAITING);

    // remove and re-insert linkContentControls
    await taskState.taskList.removeLinkContentControlsAsync();
    await taskState.taskList.insertLinkContentControlsAsync();

    // get pdf
    try {
      const pdfBase64: string = await PdfService.getDocument();
      prepActions.setTaskPdf(pdfBase64);
      setConversionStatus(RequestStatus.SUCCESS);

      // download pdf
      downloadFileBase64("application/pdf", "exam.pdf", pdfBase64);
    } catch (e) {
      console.warn("PDF conversion failed with reason:", e);
      setConversionStatus(RequestStatus.ERROR);
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
        hidden={conversionStatus !== RequestStatus.ERROR}
        onDismiss={() => setConversionStatus(RequestStatus.IDLE)}
        dialogContentProps={errorDialogContentProps}
      >
        <DialogFooter>
          <DefaultButton onClick={() => setConversionStatus(RequestStatus.IDLE)} text="Ok" />
        </DialogFooter>
      </Dialog>
      <PrimaryButton
        id="convert-btn"
        className="margin-right1"
        onClick={convertToPdf}
        text={conversionStatus !== RequestStatus.WAITING ? "Konvertieren" : null}
      >
        {conversionStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
      </PrimaryButton>
    </div>
  );
}
