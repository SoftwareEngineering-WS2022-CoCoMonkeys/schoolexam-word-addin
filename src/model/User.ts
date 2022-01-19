import Person from "./Person";

/**
 * A user of the system.
 */
export default class User {
  /** An arbitrary name chosen by the user or given to him by the system, not their first/last name */
  username: string;
  /** The real person associated with this user */
  person: Person;

  constructor(username: string, person: Person) {
    this.username = username;
    this.person = person;
  }
}
