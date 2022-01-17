import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IDialogContentProps,
  PrimaryButton,
  Spinner,
} from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import "./BuildButton.scss";
import usePrep from "../state/PreparationStore";
import { ExamStatus } from "../../../import_dto/Exam";
import ExamsRepository from "../services/OnlineExamsRepository";
import RequestStatus from "../state/RequestStatus";
import downloadFileBase64 from "../services/DownloadService";

export default function BuildButton(_props: unknown): JSX.Element {
  // GLOBAL STATE
  const [prepState, prepActions] = usePrep();

  // LOCAL STATE
  const [buildStatus, setBuildStatus] = useState(RequestStatus.IDLE);
  const [cleanState, setCleanState] = useState(RequestStatus.IDLE);
  const [dialogVisible, setDialogVisible] = useState(false);

  async function triggerBuild() {
    setBuildStatus(RequestStatus.WAITING);
    try {
      const build = await ExamsRepository.getBuild(prepState.selectedExam.id);
      prepActions.setBuild(build);
      setBuildStatus(RequestStatus.SUCCESS);

      // download
      downloadFileBase64("application/pdf", "build.pdf", prepState.build.pdfFile);
    } catch (e) {
      console.warn("Building failed with reason:", e);
      setBuildStatus(RequestStatus.ERROR);
    }
  }

  async function triggerClean() {
    setCleanState(RequestStatus.WAITING);
    await ExamsRepository.clean(prepState.selectedExam.id);
    setCleanState(RequestStatus.SUCCESS);
  }

  const buildDialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: "Kompilieren",
    subText: "Dies kann einige Minuten dauern",
  };

  const cleanButton =
    prepState.selectedExam != null && prepState.selectedExam.status === ExamStatus.SubmissionReady ? (
      <PrimaryButton className="margin-top1" onClick={triggerClean}>
        {cleanState === RequestStatus.WAITING ? <Spinner /> : "Kompilieren"}
      </PrimaryButton>
    ) : (
      ""
    );

  return (
    <div>
      <Dialog
        onDismiss={() => setDialogVisible(false)}
        hidden={!dialogVisible}
        dialogContentProps={buildDialogContentProps}
      >
        <DialogFooter>
          {cleanButton}
          <DefaultButton className="margin-top1" onClick={triggerBuild}>
            {buildStatus === RequestStatus.WAITING ? <Spinner /> : "Kompilieren"}
          </DefaultButton>
        </DialogFooter>
      </Dialog>
      <PrimaryButton
        id="build-dialog-btn"
        className="margin-right1"
        onClick={() => setDialogVisible(true)}
        disabled={
          (prepState.selectedExam?.status !== ExamStatus.BuildReady &&
            prepState.selectedExam?.status !== ExamStatus.SubmissionReady) ??
          true
        }
      >
        {buildStatus === RequestStatus.WAITING ? <Spinner /> : "Kompilieren"}
      </PrimaryButton>
    </div>
  );
}
