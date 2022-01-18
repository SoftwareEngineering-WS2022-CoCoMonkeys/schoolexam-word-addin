import Person from "./Person";

export default class User {
  username: string;
  person: Person;

  constructor(username: string, person: Person) {
    this.username = username;
    this.person = person;
  }
}
