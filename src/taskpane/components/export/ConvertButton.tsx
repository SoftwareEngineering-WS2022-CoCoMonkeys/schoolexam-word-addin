import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import * as React from "react";
import "./ConvertButton.scss";
import { useTasks } from "../state/DocumentStore";
import RequestStatus from "../state/RequestStatus";
import useDocument from "../state/ExamsStore";

export default function ConvertButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [taskList] = useTasks();
  const [examsState, examsActions] = useDocument();

  async function convertToPdf() {
    examsActions.setConversionStatus(RequestStatus.WAITING);

    // remove and re-insert linkContentControls
    await taskList.removeLinkContentControlsAsync();
    await taskList.insertLinkContentControlsAsync();

    await examsActions.convertToPdf();
    // remove link content controls
    await taskList.removeLinkContentControlsAsync();
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
        hidden={examsState.conversionStatus !== RequestStatus.ERROR}
        onDismiss={() => examsActions.setConversionStatus(RequestStatus.IDLE)}
        dialogContentProps={errorDialogContentProps}
      >
        <DialogFooter>
          <DefaultButton onClick={() => examsActions.setConversionStatus(RequestStatus.IDLE)} text="Ok" />
        </DialogFooter>
      </Dialog>
      <PrimaryButton
        id="convert-btn"
        className="margin-right1"
        onClick={convertToPdf}
        text={examsState.conversionStatus !== RequestStatus.WAITING ? "Konvertieren" : null}
      >
        {examsState.conversionStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
      </PrimaryButton>
    </div>
  );
}
