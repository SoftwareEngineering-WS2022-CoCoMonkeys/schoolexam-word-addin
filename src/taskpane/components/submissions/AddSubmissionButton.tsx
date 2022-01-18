import * as React from "react";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import useSubmissions from "../state/SubmissionsStore";
import RequestStatus from "../state/RequestStatus";
import useExams from "../state/ExamsStore";
import TooltipCheckList, { CheckListItem } from "../export/TooltipCheckList";

export default function AddSubmissionButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [submissionsState, submissionsActions] = useSubmissions();
  const [examsState] = useExams();

  const addSubmissionsCheckList = [new CheckListItem(examsState.selectedExam != null, "Prüfung ausgewählt")];
  const checkListFullfilled = addSubmissionsCheckList.map((item) => item.condition).reduce((a, b) => a && b);

  const addSubmissionsBtn = (
    <PrimaryButton
      disabled={!checkListFullfilled}
      onClick={() => submissionsActions.addSubmissions(examsState.selectedExam.id)}
      text={submissionsState.addSubmissionsStatus !== RequestStatus.WAITING ? "Einreichung hinzufügen" : null}
    >
      {submissionsState.addSubmissionsStatus === RequestStatus.WAITING && <Spinner size={SpinnerSize.small} />}
    </PrimaryButton>
  );
  return <TooltipCheckList renderChild={addSubmissionsBtn} items={addSubmissionsCheckList} />;
}
