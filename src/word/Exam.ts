import IExam from "../model/IExam";

export default class Exam implements IExam {
  private readonly _examId: string;
  private readonly _status?: string;
  private readonly _title?: string;
  private readonly _dateOfExam?: Date;
  private readonly _subject?: string;

  constructor(examId: string, title?: string, status?: string, dateOfExam?: Date, subject?: string) {
    this._examId = examId;
    this._title = title;
    this._status = status;
    this._dateOfExam = dateOfExam;
    this._subject = subject;
  }

  get examId(): string {
    return this._examId;
  }

  get status(): string {
    return this._status;
  }

  get title(): string {
    return this._title;
  }

  get dateOfExam(): Date {
    return this._dateOfExam;
  }

  get subject(): string {
    return this._subject;
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
    return this._examId === (other as Exam)._examId;
  }
}
