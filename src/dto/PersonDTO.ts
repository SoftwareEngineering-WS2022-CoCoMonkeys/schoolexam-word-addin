import IDTO from "./IDTO";
import Person from "../model/Person";

/**
 * DTO for {@link Person}
 */
export class PersonDTO implements IDTO<Person> {
  dateOfBirth: string;
  emailAddress: string;
  firstName: string;
  lastName: string;

  /**
   * Create DTO from JSON string.
   * @param json The typed object.
   */
  static fromJson(json: string): PersonDTO {
    function reviver(key, value) {
      if (key === "") {
        return Object.assign(new PersonDTO(), value);
      }
      return value;
    }

    return JSON.parse(json, reviver);
  }

  /**
   * @inheritDoc
   */
  toModel(): Person {
    return new Person(new Date(this.dateOfBirth), this.emailAddress, this.firstName, this.lastName);
  }
}
