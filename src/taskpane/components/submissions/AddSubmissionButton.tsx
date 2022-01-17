import * as React from "react";
import { useState } from "react";
import { uploadFileBase64 } from "../services/DownloadService";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import useSubmissions from "../state/SubmissionsStore";
import RequestStatus from "../state/RequestStatus";

export default function AddSubmissionButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [submissionsState, submissionsActions] = useSubmissions();

  // LOCAL STATE
  const [addSubmissionStatus, setAddSubmissionStatus] = useState(RequestStatus.IDLE);

  function addSubmissions() {
    setAddSubmissionStatus(RequestStatus.WAITING);
    uploadFileBase64(
      (filesBase64) => {
        submissionsActions.addAll(filesBase64);
        setAddSubmissionStatus(RequestStatus.SUCCESS);
      },
      (error) => {
        console.warn("Adding submissions failed with reason:", error);
        setAddSubmissionStatus(RequestStatus.ERROR);
      }
    );
  }

  return (
    <PrimaryButton
      className="margin-top1"
      onClick={addSubmissions}
      text={addSubmissionStatus !== RequestStatus.WAITING ? "Einreichung hinzufügen" : null}
    >
      {addSubmissionStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
    </PrimaryButton>
  );
}
