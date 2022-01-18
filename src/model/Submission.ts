export default class Submission {
  constructor(pdf: string, examId: string) {
    this.pdf = pdf;
    this.examId = examId;
  }

  pdf: string;
  examId: string;
}
