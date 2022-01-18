export default class Participant {
  id: string;
  displayName: string;

  constructor(id: string, displayName: string) {
    this.id = id;
    this.displayName = displayName;
  }
}
