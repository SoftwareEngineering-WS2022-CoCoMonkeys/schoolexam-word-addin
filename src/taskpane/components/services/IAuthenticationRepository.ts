import Authentication from "../../../model/Authentication";

export default interface IAuthentificationRepository {
  login(username: string, password: string): Promise<Authentication>;

  authHeader(): { Authorization?: string };
}
