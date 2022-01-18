import UploadSubmissionsButton from "./UploadSubmissionsButton";
import AddSubmissionButton from "./AddSubmissionButton";
import * as React from "react";
import { Stack } from "@fluentui/react";
import ExamList from "../export/ExamList";
import { ExamStatus } from "../../../model/Exam";

export default function SubmissionsView(_props: unknown): JSX.Element {
  return (
    <Stack horizontal={false} horizontalAlign="center" verticalAlign="center" tokens={{ childrenGap: 20 }}>
      <Stack horizontal={true} styles={{ root: { height: 44 } }} tokens={{ childrenGap: 10 }}>
        <AddSubmissionButton />
        <UploadSubmissionsButton />
      </Stack>
      <ExamList
        unselectableExams={(exam) =>
          exam.status !== ExamStatus.InCorrection && exam.status !== ExamStatus.SubmissionReady
        }
      />
    </Stack>
  );
}
