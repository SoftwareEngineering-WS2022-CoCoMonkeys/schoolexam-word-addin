import IDTO from "./IDTO";
import Participant from "../model/Participant";

export default class ParticipantDTO implements IDTO<Participant> {
  /** The unique ID (UUID) of this participant */
  id: string;
  displayName: string;

  toModel(): Participant {
    throw new Error("Method not implemented");
  }
}
