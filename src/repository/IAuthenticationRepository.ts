import Authentication from "../model/Authentication";

/**
 * Common interface for repositories that handle the login and authentication process.
 */
export default interface IAuthenticationRepository {
  /**
   * Asynchronously attempt to login the user with the supplied username and password.
   * @param username
   * @param password
   * @returns The authentication data wrapped in a Promise.
   */
  login(username: string, password: string): Promise<Authentication>;

  /**
   * @returns A partial HTTP header that contains authentication metadata (if available).
   */
  authHeader(): { Authorization?: string };
}
