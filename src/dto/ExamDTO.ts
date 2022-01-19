import Exam, { ExamStatus } from "../model/Exam";
import ParticipantDTO from "./ParticipantDTO";

/**
 * DTO for {@link Exam}
 */
export default class ExamDTO {
  readonly id: string;
  readonly status: string;
  readonly title: string;
  readonly date: string;
  readonly topic: string;
  readonly participants: ParticipantDTO[];

  constructor(id: string, status: string, title: string, date: string, topic: string, participants: ParticipantDTO[]) {
    this.id = id;
    this.status = status;
    this.title = title;
    this.date = date;
    this.topic = topic;
    this.participants = participants;
  }

  /**
   * Create DTO from JSON string.
   * @param json The typed object.
   */
  static fromJson(json: string): ExamDTO {
    function reviver(key, value) {
      if (key === "") {
        // @ts-ignore
        return Object.assign(new ExamDTO(), value);
      }
      return value;
    }

    return JSON.parse(json, reviver);
  }

  /**
   * Create DTO from model object
   * @param model The model object.
   */
  static fromModel(model: Exam): ExamDTO {
    return new ExamDTO(
      model.id,
      model.status.toString(),
      model.title,
      model.date.toUTCString(),
      model.topic,
      model.participants.map((p) => ParticipantDTO.fromModel(p))
    );
  }

  /**
   * @inheritDoc
   */
  toModel(): Exam {
    return new Exam(this.id, this.status as ExamStatus, this.title, new Date(this.date), this.topic, this.participants);
  }
}
