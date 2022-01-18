export default class Submission {
  pdf: string;
  examId: string;

  constructor(pdf: string, examId: string) {
    this.pdf = pdf;
    this.examId = examId;
  }
}
