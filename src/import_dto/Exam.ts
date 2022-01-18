export default class Exam {
  readonly id: string;
  readonly status: string;
  readonly title: string;
  readonly date: Date;

  constructor(id: string, status: string, title: string, date: Date, topic: string, participants: Participant[]) {
    this.id = id;
    this.status = status;
    this.title = title;
    this.date = date;
    this.topic = topic;
    this.participants = participants;
  }

  readonly topic: string;
  readonly participants: Participant[];

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
    return this.id === (other as Exam).id;
  }
}

export enum ExamStatus {
  Planned = "Planned",
  BuildReady = "BuildReady",
  SubmissionReady = "SubmissionReady",
  InCorrection = "InCorrection",
  Corrected = "Corrected",
  Published = "Published",
}
