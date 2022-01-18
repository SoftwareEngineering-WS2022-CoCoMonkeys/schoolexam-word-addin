import IDTO from "./IDTO";
import Participant from "../model/Participant";

export default class ParticipantDTO implements IDTO<Participant> {
  id: string;
  displayName: string;

  toModel(): Participant {
    throw new Error("Method not implemented");
  }
}
