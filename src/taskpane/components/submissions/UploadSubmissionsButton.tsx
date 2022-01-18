import useSubmissions from "../state/SubmissionsStore";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import * as React from "react";
import RequestStatus from "../state/RequestStatus";
import useExams from "../state/ExamsStore";

export default function UploadSubmissionsButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [submissionsState, submissionsActions] = useSubmissions();
  const [examsState] = useExams();

  return (
    <PrimaryButton
      onClick={() => submissionsActions.uploadSubmissions(examsState.selectedExam.id)}
      className="margin-top1"
      disabled={submissionsState.submissions.length == 0 || !examsState.selectedExam}
      text={
        (submissionsState.uploadSubmissionsStatus !== RequestStatus.WAITING ? "Einreichungen hochladen " : "") +
        `(${submissionsState.submissions.length})`
      }
    >
      {submissionsState.uploadSubmissionsStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
    </PrimaryButton>
  );
}
