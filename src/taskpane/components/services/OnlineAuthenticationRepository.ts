import Authentication from "../../../import_dto/Authentication";
import IAuthenticationRepository from "./IAuthenticationRepository";
import ApiService, { HttpMethod } from "./ApiService";

class OnlineAuthenticationRepository implements IAuthenticationRepository {
  private readonly AUTH_URL = "/Authentication/Authenticate";

  login(username: string, password: string): Promise<Authentication> {
    return ApiService.request(HttpMethod.POST, this.AUTH_URL, { username, password })
      .then((response) => response.json())
      .then((json) => {
        const auth = json as Authentication;
        console.debug("Received authentication token:", auth);
        localStorage.setItem("token", auth.token);
        return auth;
      });
  }

  authHeader(): { Authorization?: string } {
    const token = localStorage.getItem("token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }
}

const AuthentificationRepository = new OnlineAuthenticationRepository();
export default AuthentificationRepository;