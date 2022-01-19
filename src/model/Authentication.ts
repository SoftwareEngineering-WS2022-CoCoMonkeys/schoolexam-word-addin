import User from "./User";

/**
 * Holds all necessary information about the current login session and provides a way to authenticate the user without
 * resending the username/password-combination.
 */
export default class Authentication {
  /** A standard JWT token used authenticate this session and user */
  token: string;
  /** The role of the user currently logged in */
  role: string;
  /** The user currently logged in */
  user: User;

  constructor(token: string, role: string, user: User) {
    this.token = token;
    this.role = role;
    this.user = user;
  }
}
