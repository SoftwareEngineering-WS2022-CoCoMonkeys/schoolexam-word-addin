export default class Exam {
  constructor(id: string, title: string, status: string, dateOfExam: Date, subject: string) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.dateOfExam = dateOfExam;
    this.subject = subject;
  }

  id!: string;
  status!: string;
  title!: string;
  dateOfExam!: Date;
  subject!: string;
}

enum ExamStatus {
  planned,
  buildReady,
}
