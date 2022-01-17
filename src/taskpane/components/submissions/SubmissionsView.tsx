import UploadSubmissionsButton from "./UploadSubmissionsButton";
import AddSubmissionButton from "./AddSubmissionButton";
import * as React from "react";
import { Stack } from "@fluentui/react";
import ExamList from "../export/ExamList";
import { ExamStatus } from "../../../import_dto/Exam";

export default function SubmissionsView(_props: unknown): JSX.Element {
  return (
    <Stack horizontal={false} horizontalAlign="center" tokens={{ childrenGap: 20 }}>
      <ExamList
        unselectableExams={(exam) =>
          exam.status !== ExamStatus.InCorrection && exam.status !== ExamStatus.SubmissionReady
        }
      />
      <AddSubmissionButton />
      <UploadSubmissionsButton />
    </Stack>
  );
}
