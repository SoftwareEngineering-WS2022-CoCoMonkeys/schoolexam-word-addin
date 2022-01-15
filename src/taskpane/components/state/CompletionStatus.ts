import IPreparationState from "./IPreparationState";

class CompletionStatus {
  private readonly prepState: IPreparationState;

  constructor(prepState: IPreparationState) {
    this.prepState = prepState;
  }

  isExportReady() {
    return (
      this.prepState.qrCode.bothArePresent() &&
      this.prepState.loggedIn &&
      this.prepState.taskPdf != null &&
      this.prepState.selectedExam != null
    );
  }

  isBuildReady() {
    // TODO do properly
    return this.isExportReady();
  }
}

export default function Status(prepState: IPreparationState): CompletionStatus {
  return new CompletionStatus(prepState);
}
