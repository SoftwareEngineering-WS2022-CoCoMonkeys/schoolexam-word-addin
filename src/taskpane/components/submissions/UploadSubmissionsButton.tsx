import useSubmissions from "../../../store/SubmissionsStore";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IDialogContentProps,
  PrimaryButton,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import * as React from "react";
import RequestStatus, { isErroneousStatus } from "../../../state/RequestStatus";
import TooltipCheckList, { CheckListItem } from "../export/TooltipCheckList";
import { useLoggedIn } from "../../../store/AuthenticationStore";

/**
 * React component that wraps a button that, when clicked, triggers the {@link Submission} upload via the submissions
 * MicroStore ({@link useSubmissions}).
 *
 * Some conditions have to be fulfilled before the button can be clicked. These conditions
 * are presented in a {@link TooltipCheckList} format on hover.
 * @component
 */
export default function UploadSubmissionsButton(): JSX.Element {
  // GLOBAL STATE
  const [submissionsState, submissionsActions] = useSubmissions();
  const [loggedIn] = useLoggedIn();

  const uploadSubmissionsCheckList = [
    new CheckListItem(loggedIn, "Eingeloggt"),
    new CheckListItem(submissionsState.submissions.length > 0, "Es wurden Einreichungen hinzugefügt"),
  ];
  /** Wether the button is enabled */
  const checkListFulfilled = uploadSubmissionsCheckList.map((item) => item.status).reduce((a, b) => a && b);

  const errorDialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: "Hochladen gescheitert",
    subText: "Das Hochladen der Einreichungen ist fehlgeschlagen.",
  };
  const successDialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: "Hochladen erfolgreich",
    subText: "Das Hochladen der Einreichungen war erfolgreich.",
  };

  const uploadSubmissionBtn = (
    <PrimaryButton
      onClick={() => submissionsActions.uploadSubmissions()}
      disabled={!checkListFulfilled}
      text={
        (submissionsState.uploadSubmissionsStatus !== RequestStatus.WAITING ? "Einreichungen hochladen " : "") +
        `(${submissionsState.submissions.length})`
      }
    >
      {submissionsState.uploadSubmissionsStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
    </PrimaryButton>
  );

  return (
    <>
      <Dialog
        className="dialog"
        onDismiss={() => submissionsActions.setUploadSubmissionsStatus(RequestStatus.IDLE)}
        hidden={
          !isErroneousStatus(submissionsState.uploadSubmissionsStatus) &&
          submissionsState.uploadSubmissionsStatus !== RequestStatus.SUCCESS
        }
        dialogContentProps={
          submissionsState.uploadSubmissionsStatus === RequestStatus.SUCCESS
            ? successDialogContentProps
            : errorDialogContentProps
        }
      >
        <DialogFooter>
          <DialogFooter>
            <DefaultButton
              onClick={() => submissionsActions.setUploadSubmissionsStatus(RequestStatus.IDLE)}
              text="Ok"
            />
          </DialogFooter>
        </DialogFooter>
      </Dialog>
      <TooltipCheckList renderChild={uploadSubmissionBtn} items={uploadSubmissionsCheckList} />{" "}
    </>
  );
}
