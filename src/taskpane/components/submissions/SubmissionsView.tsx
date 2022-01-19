import UploadSubmissionsButton from "./UploadSubmissionsButton";
import AddSubmissionButton from "./AddSubmissionButton";
import * as React from "react";
import { Stack } from "@fluentui/react";
import ExamList from "../util/ExamList";
import { ExamStatus } from "../../../model/Exam";

/**
 * React component that organizes the submissions-related components.
 * @component
 */
export default function SubmissionsView(): JSX.Element {
  return (
    <Stack horizontal={false} horizontalAlign="center" verticalAlign="center" tokens={{ childrenGap: 20 }}>
      <Stack horizontal={true} styles={{ root: { height: 44 } }} tokens={{ childrenGap: 10 }}>
        <AddSubmissionButton />
        <UploadSubmissionsButton />
      </Stack>
      <ExamList
        // Only exams in later three stages are eligible to receive submissions
        unselectableExams={(exam) =>
          exam.status !== ExamStatus.SubmissionReady &&
          exam.status !== ExamStatus.InCorrection &&
          exam.status !== ExamStatus.Corrected
        }
      />
    </Stack>
  );
}
