export default class Exam {
  examId: string;
  status?: string;
  title?: string;
  dateOfExam?: Date;
  subject?: string;

  constructor(examId: string, title?: string, status?: string, dateOfExam?: Date, subject?: string) {
    this.examId = examId;
    this.title = title;
    this.status = status;
    this.dateOfExam = dateOfExam;
    this.subject = subject;
  }

  static fromImport(examObj: any): Exam {
    return new Exam(examObj.id, examObj.title, examObj.state, new Date(examObj.date), examObj.subject);
  }

  equals(other: unknown): boolean {
    if (other == null) {
      return false;
    }
    if (this === other) {
      return true;
    }
    if (typeof this !== typeof other) {
      return this == other;
    }
    return this.examId === (other as Exam).examId;
  }
}
