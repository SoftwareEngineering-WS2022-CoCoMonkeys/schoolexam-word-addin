import { User } from "./User";

export default class Authentication {
  token: string;
  role: string;
  user: User;

  static fromJson(json: string): Authentication {
    function reviver(key, value) {
      if (key === "user") {
        // TODO ugly but works
        return User.fromJson(JSON.stringify(value));
      } else if (key === "") {
        return Object.assign(new Authentication(), value);
      }
      return value;
    }

    return JSON.parse(json, reviver);
  }
}
