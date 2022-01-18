import * as React from "react";
import ExamList from "./ExamList";
import ExportButton from "./ExportButton";
import { Stack } from "@fluentui/react";
import BuildButton from "./BuildButton";
import ConvertButton from "./ConvertButton";
import { ExamStatus } from "../../../model/Exam";

export default function ExportView(_props: unknown): JSX.Element {
  return (
    <Stack horizontal={false} horizontalAlign="center" verticalAlign="center" tokens={{ childrenGap: 20 }}>
      <Stack horizontal={true} styles={{ root: { height: 44 } }} tokens={{ childrenGap: 10 }}>
        <ConvertButton />
        <ExportButton />
        <BuildButton />
      </Stack>
      <ExamList
        unselectableExams={(exam) =>
          exam.status !== ExamStatus.Planned &&
          exam.status !== ExamStatus.BuildReady &&
          exam.status !== ExamStatus.SubmissionReady
        }
      />
    </Stack>
  );
}
