export default class Exam {
  static fromImport(examObj: any) {
    return new Exam(examObj.id, examObj.title, examObj.state, new Date(examObj.date), examObj.subject);
  }

  constructor(examId: string, title?: string, status?: string, dateOfExam?: Date, subject?: string) {
    this.examId = examId;
    this.title = title;
    this.status = status;
    this.dateOfExam = dateOfExam;
    this.subject = subject;
  }

  examId: string;
  status?: string;
  title?: string;
  dateOfExam?: Date;
  subject?: string;

  equals(other: any) {
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

enum ExamStatus {
  planned,
  buildReady,
}
