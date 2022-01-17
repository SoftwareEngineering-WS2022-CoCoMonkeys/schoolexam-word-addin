export default class SubmissionDTO {
  /** base64 encoded PDF of the submission scan */
  pdf: string;

  constructor(pdf: string) {
    this.pdf = pdf;
  }
}
