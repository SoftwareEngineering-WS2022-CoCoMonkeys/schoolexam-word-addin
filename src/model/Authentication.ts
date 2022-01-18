import User from "./User";

export default class Authentication {
  token: string;
  role: string;
  user: User;

  constructor(token: string, role: string, user: User) {
    this.token = token;
    this.role = role;
    this.user = user;
  }
}
