import * as React from "react";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import useSubmissions from "../state/SubmissionsStore";
import RequestStatus from "../state/RequestStatus";
import useExams from "../state/ExamsStore";

export default function AddSubmissionButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [submissionsState, submissionsActions] = useSubmissions();
  const [examsState] = useExams();

  return (
    <PrimaryButton
      className="margin-top1"
      disabled={examsState.selectedExam == null}
      onClick={() => submissionsActions.addSubmissions(examsState.selectedExam.id)}
      text={submissionsState.addSubmissionsStatus !== RequestStatus.WAITING ? "Einreichung hinzufügen" : null}
    >
      {submissionsState.addSubmissionsStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
    </PrimaryButton>
  );
}
