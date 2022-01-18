export default class Participant {
  constructor(id: string, displayName: string) {
    this.id = id;
    this.displayName = displayName;
  }

  id: string;
  displayName: string;
}
