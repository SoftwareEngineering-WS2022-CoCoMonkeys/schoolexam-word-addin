import IDTO from "./IDTO";
import Participant from "../model/Participant";

/**
 * DTO for {@link Participant}
 */
export default class ParticipantDTO implements IDTO<Participant> {
  /** The unique ID (UUID) of this participant */
  id: string;
  displayName: string;

  constructor(id: string, displayName: string) {
    this.id = id;
    this.displayName = displayName;
  }

  /**
   * Create DTO from model object
   * @param model The model object.
   */
  static fromModel(model: Participant): ParticipantDTO {
    return new ParticipantDTO(model.id, model.displayName);
  }

  /**
   * @inheritDoc
   */
  toModel(): Participant {
    throw new Error("Method not implemented");
  }
}
