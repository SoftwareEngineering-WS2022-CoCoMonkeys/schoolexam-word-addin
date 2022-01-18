import { UserDTO } from "./UserDTO";
import IDTO from "./IDTO";
import Authentication from "../model/Authentication";

export default class AuthenticationDTO implements IDTO<Authentication> {
  token: string;
  role: string;
  user: UserDTO;

  static fromJson(json: string): AuthenticationDTO {
    function reviver(key, value) {
      if (key === "user") {
        // TODO ugly but works
        return UserDTO.fromJson(JSON.stringify(value));
      } else if (key === "") {
        return Object.assign(new AuthenticationDTO(), value);
      }
      return value;
    }

    return JSON.parse(json, reviver);
  }

  toModel(): Authentication {
    return new Authentication(this.token, this.role, this.user.toModel());
  }
}
