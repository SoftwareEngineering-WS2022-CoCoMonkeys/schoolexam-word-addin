import Participant from "./Participant";

/**
 * The exam from a planning perspective.
 * This class does NOT contain information about the exam template, the contained tasks, the grading scheme, etc...
 */
export default class Exam {
  /** The unique ID (UUID) of this exam */
  readonly id: string;
  /** The current status of this exam */
  readonly status: ExamStatus;
  /** The title of this exam. Usually contains information about the type of exam, e.g. 'Schulaufgabe' */
  readonly title: string;
  /** The date this exam is planned to take place on*/
  readonly date: Date;
  /** The topic of this exam. This usually coincides with a school subject or topic within a subject, e.g. 'Mathematik - Integralrechnung' */
  readonly topic: string;
  /** The participants of this exam */
  readonly participants: Participant[];

  static fromJson(json: string): Exam {
    function reviver(key, value) {
      if (key === "") {
        return Object.assign(new Exam(), value);
      } else if (key === "status") {
        return value as ExamStatus;
      } else if (key === "date") {
        return new Date(value);
      }
      return value;
    }

    return JSON.parse(json, reviver);
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
    return this.id === (other as Exam).id;
  }
}

export enum ExamStatus {
  // Exam has been created but no task or template data has been associated with it
  Planned = "Planned",
  // Task and template data has been added
  BuildReady = "BuildReady",
  // The exam booklets have been built and the exam can take place
  SubmissionReady = "SubmissionReady",
  // The exam has taken place and is being corrected
  InCorrection = "InCorrection",
  // The correction is finished
  Corrected = "Corrected",
  // The exam results have been published
  Published = "Published",
}
