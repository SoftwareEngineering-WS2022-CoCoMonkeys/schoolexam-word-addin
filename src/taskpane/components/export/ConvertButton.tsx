import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import * as React from "react";
import { useTasks } from "../state/DocumentStore";
import RequestStatus from "../state/RequestStatus";
import useDocument from "../state/ExamsStore";

/**
 * React component that wraps a button that, when clicked, triggers the conversion of the opened Word document via
 * the exams MicroStore ({@link useExams}).
 * Also uses the tasks document MicroStore ({@link useDocument}) to trigger necessary preparation and teardown actions.
 * If the conversion fails for whatever reason, an error dialog is displayed.
 * @component
 */
export default function ConvertButton(): JSX.Element {
  // GLOBAL STATE
  const [, taskActions] = useTasks();
  const [examsState, examsActions] = useDocument();

  async function convertToPdf() {
    examsActions.setConversionStatus(RequestStatus.WAITING);

    // setup conversion
    await taskActions.prepareForConversion();
    await examsActions.convertToPdf();
    // tear down
    await taskActions.afterConversion();
  }

  const errorDialogContentProps = {
    type: DialogType.normal,
    title: "Konvertierung gescheitert",
    subText:
      "Die Konvertierung zu PDF ist fehlgeschlagen. Eventuell kann ein Neustart des Add-Ins diesen Fehler beheben.",
  };

  return (
    <>
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
        onClick={convertToPdf}
        text={examsState.conversionStatus !== RequestStatus.WAITING ? "Konvertieren (PDF)" : null}
      >
        {examsState.conversionStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
      </PrimaryButton>
    </>
  );
}
