import { UserDTO } from "./UserDTO";
import IDTO from "./IDTO";
import Authentication from "../model/Authentication";

/**
 * DTO for {@link Authentication}
 */
export default class AuthenticationDTO implements IDTO<Authentication> {
  token: string;
  role: string;
  user: UserDTO;

  /**
   * Create DTO from JSON string.
   * @param json The typed object.
   */
  static fromJson(json: string): AuthenticationDTO {
    function reviver(key, value) {
      if (key === "user") {
        return UserDTO.fromJson(JSON.stringify(value));
      } else if (key === "") {
        return Object.assign(new AuthenticationDTO(), value);
      }
      return value;
    }

    return JSON.parse(json, reviver);
  }

  /**
   * @inheritDoc
   */
  toModel(): Authentication {
    return new Authentication(this.token, this.role, this.user.toModel());
  }
}
