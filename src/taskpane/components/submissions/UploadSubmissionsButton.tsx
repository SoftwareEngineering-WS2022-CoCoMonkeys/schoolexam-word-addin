import useSubmissions from "../state/SubmissionsStore";
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
import RequestStatus from "../state/RequestStatus";
import TooltipCheckList, { CheckListItem } from "../export/TooltipCheckList";
import { useLoggedIn } from "../state/AuthenticationStore";

export default function UploadSubmissionsButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [submissionsState, submissionsActions] = useSubmissions();
  const [loggedIn] = useLoggedIn();

  const uploadSubmissionsCheckList = [
    new CheckListItem(loggedIn, "Eingeloggt"),
    new CheckListItem(submissionsState.submissions.length > 0, "Es wurden Einreichungen hinzugefügt"),
  ];
  const checkListFullfilled = uploadSubmissionsCheckList.map((item) => item.condition).reduce((a, b) => a && b);

  const uploadSubmissionBtn = (
    <PrimaryButton
      onClick={() => submissionsActions.uploadSubmissions()}
      disabled={!checkListFullfilled}
      text={
        (submissionsState.uploadSubmissionsStatus !== RequestStatus.WAITING ? "Einreichungen hochladen " : "") +
        `(${submissionsState.submissions.length})`
      }
    >
      {submissionsState.uploadSubmissionsStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
    </PrimaryButton>
  );

  const uploadSubmissionsDialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: "Hochladen gescheitert",
    subText: "Das Hochladen der Einreichungen ist fehlgeschlagen.",
  };

  return (
    <>
      <Dialog
        className="dialog"
        onDismiss={() => submissionsActions.setUploadSubmissionsStatus(RequestStatus.IDLE)}
        hidden={submissionsState.uploadSubmissionsStatus !== RequestStatus.ERROR}
        dialogContentProps={uploadSubmissionsDialogContentProps}
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
