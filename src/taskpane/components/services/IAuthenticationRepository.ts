import Authentication from "../../../import_dto/Authentication";

export default interface IAuthentificationRepository {
  login(username: string, password: string): Promise<Authentication>;

  authHeader(): { Authorization?: string };
}
