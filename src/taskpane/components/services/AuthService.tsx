import ApiService from "./ApiService";

export default class AuthService {
  private static readonly AUTH_URL = "/Authentication/Authenticate";

  static login(username: string, password: string): Promise<boolean> {
    return ApiService.api("POST", this.AUTH_URL, { username, password })
      .then((response) => response.text())
      .then((response) => {
        if (response) {
          localStorage.setItem("userJwt", response);
          return true;
        } else {
          return false;
        }
      });
  }

  static authHeader(): { Authorization?: string } {
    const userJwt = localStorage.getItem("userJwt");
    if (userJwt) {
      return { Authorization: "Bearer " + userJwt };
    } else {
      return {};
    }
  }
}
