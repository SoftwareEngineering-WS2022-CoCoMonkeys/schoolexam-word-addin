import * as React from "react";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import useSubmissions from "../state/SubmissionsStore";
import RequestStatus from "../state/RequestStatus";

export default function AddSubmissionButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [submissionsState, submissionsActions] = useSubmissions();

  return (
    <PrimaryButton
      className="margin-top1"
      onClick={() => submissionsActions.addSubmissions()}
      text={submissionsState.addSubmissionsStatus !== RequestStatus.WAITING ? "Einreichung hinzufügen" : null}
    >
      {submissionsState.addSubmissionsStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
    </PrimaryButton>
  );
}
