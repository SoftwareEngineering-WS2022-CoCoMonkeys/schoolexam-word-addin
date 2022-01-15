export default class Exam {
  readonly id: string;
  readonly status?: string;
  readonly title?: string;
  readonly dateOfExam?: Date;
  readonly topic?: string;
  readonly participants?: Participant[];

  static fromJson(json: string): Exam {
    function reviver(key, value) {
      if (key === "") {
        return Object.assign(new Exam(), value);
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
