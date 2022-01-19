import AuthenticationDTO from "../../../dto/AuthenticationDTO";
import IAuthenticationRepository from "./IAuthenticationRepository";
import ApiService, { HttpMethod } from "./ApiService";
import Authentication from "../../../model/Authentication";
import ServerError from "./ServerError";

/**
 * Authentication repository that uses the deployed SchoolExam backend.
 */
class OnlineAuthenticationRepository implements IAuthenticationRepository {
  /** The path to use for authentiation */
  private readonly AUTH_URL = "/Authentication/Authenticate";

  /**
   * @inheritDoc
   * @returns The HTTP response wrapped in a Promise.
   */
  login(username: string, password: string): Promise<Authentication> {
    return ApiService.request(HttpMethod.POST, this.AUTH_URL, { username, password })
      .then((response) => response.json())
      .then((json) => {
        const auth = AuthenticationDTO.fromJson(JSON.stringify(json)).toModel();
        console.debug("Received authentication token:", auth);
        localStorage.setItem("token", auth.token);
        return auth;
      });
  }

  /**
   * @inheritDoc
   */
  authHeader(): { Authorization?: string } {
    const token = localStorage.getItem("token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }
}

// Singleton instantiation
const AuthenticationRepository = new OnlineAuthenticationRepository();
export default AuthenticationRepository;
