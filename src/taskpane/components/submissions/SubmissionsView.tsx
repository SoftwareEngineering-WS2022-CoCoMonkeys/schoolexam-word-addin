import UploadSubmissionsButton from "./UploadSubmissionsButton";
import AddSubmissionButton from "./AddSubmissionButton";
import * as React from "react";
import { Stack } from "@fluentui/react";
import ExamList from "../export/ExamList";

export default function SubmissionsView(_props: unknown): JSX.Element {
  return (
    <Stack horizontal={false} horizontalAlign="center" tokens={{ childrenGap: 20 }}>
      <ExamList />
      <AddSubmissionButton />
      <UploadSubmissionsButton />
    </Stack>
  );
}
