import { PersonDTO } from "./PersonDTO";
import IDTO from "./IDTO";
import User from "../model/User";

export class UserDTO implements IDTO<User> {
  username: string;
  person: PersonDTO;

  static fromJson(json: string): UserDTO {
    function reviver(key, value) {
      if (key === "person") {
        return PersonDTO.fromJson(JSON.stringify(value));
      } else if (key === "") {
        return Object.assign(new UserDTO(), value);
      }
      return value;
    }

    return JSON.parse(json, reviver);
  }

  toModel(): User {
    return new User(this.username, this.person.toModel());
  }
}
