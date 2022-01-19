/**
 * An exam participant.
 */
export default class Participant {
  /** The unique ID (UUID) of this participangt */
  id: string;
  /** How this participant should be displayed in the application */
  displayName: string;

  constructor(id: string, displayName: string) {
    this.id = id;
    this.displayName = displayName;
  }
}
