import useSubmissions from "../state/SubmissionsStore";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import RequestStatus from "../state/RequestStatus";
import SubmissionsRepository from "../services/OnlineSubmissionsRepository";
import SubmissionDTO from "../../../export_dto/SubmissionDTO";
import useExams from "../state/ExamsStore";

export default function UploadSubmissionsButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [submissionsState, submissionsActions] = useSubmissions();
  const [examsState, examsActions] = useExams();

  // LOCAL STATE
  const [submissionStatus, setSubmissionStatus] = useState(RequestStatus.IDLE);

  async function uploadSubmissions() {
    setSubmissionStatus(RequestStatus.WAITING);

    try {
      for (const submission of submissionsState.submissions.slice(0)) {
        await SubmissionsRepository.uploadSubmission(examsState.selectedExam.id, new SubmissionDTO(submission));
        submissionsActions.dropFirst();
      }

      setSubmissionStatus(RequestStatus.SUCCESS);
    } catch (e) {
      console.warn("Submission upload failed with reason", e);
      setSubmissionStatus(RequestStatus.ERROR);
    }
  }

  return (
    <PrimaryButton
      onClick={uploadSubmissions}
      className="margin-top1"
      disabled={submissionsState.submissions.length == 0 || !examsState.selectedExam}
      text={
        (submissionStatus !== RequestStatus.WAITING ? "Einreichungen hochladen " : "") +
        `(${submissionsState.submissions.length})`
      }
    >
      {submissionStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
    </PrimaryButton>
  );
}
