/**
 * A submission for a specific exam.
 * Content about the author is embedded within the submission itself.
 */
export default class Submission {
  /** The base64-encoded PDF file containing the submission (or a scan thereof) */
  pdf: string;
  /** The unique ID of the exam this submission belongs to */
  examId: string;

  constructor(pdf: string, examId: string) {
    this.pdf = pdf;
    this.examId = examId;
  }
}
