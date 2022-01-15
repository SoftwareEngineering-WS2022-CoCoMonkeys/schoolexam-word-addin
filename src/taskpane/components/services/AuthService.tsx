import ApiService, { HttpMethod } from "./ApiService";
import Authentication from "../../../import_dto/Authentication";

export default class AuthService {
  private static readonly AUTH_URL = "/Authentication/Authenticate";

  static login(username: string, password: string): Promise<Authentication> {
    return ApiService.api(HttpMethod.POST, this.AUTH_URL, { username, password })
      .then((response) => response.json())
      .then((json) => {
        const auth = json as Authentication;
        console.debug("Received authentication token:", auth);
        localStorage.setItem("token", auth.token);
        return auth;
      });
  }

  static authHeader(): { Authorization?: string } {
    const token = localStorage.getItem("token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }
}
