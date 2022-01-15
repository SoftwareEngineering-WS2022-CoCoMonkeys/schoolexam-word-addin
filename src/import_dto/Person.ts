export class Person {
  dateOfBirth: Date;
  emailAddress: string;
  firstName: string;
  lastName: string;

  static fromJson(json: string): Person {
    function reviver(key, value) {
      if (key === "dateOfBirth") {
        return new Date(value);
      } else if (key === "") {
        return Object.assign(new Person(), value);
      }
      return value;
    }

    return JSON.parse(json, reviver);
  }
}
