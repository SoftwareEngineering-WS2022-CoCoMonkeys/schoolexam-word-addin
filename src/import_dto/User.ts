import { Person } from "./Person";

export class User {
  username: string;
  person: Person;

  static fromJson(json: string): User {
    function reviver(key, value) {
      if (key === "person") {
        return Person.fromJson(JSON.stringify(value));
      } else if (key === "") {
        return Object.assign(new User(), value);
      }
      return value;
    }

    return JSON.parse(json, reviver);
  }
}
