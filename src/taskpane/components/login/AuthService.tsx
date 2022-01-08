import axios from "axios";

class AuthService {
  private readonly AUTH_URL = "10.33.196.27:55011/Authenticate";

  login(username: string, password: string): Promise<boolean> {
    return axios.post(this.AUTH_URL, { username, password }).then((response) => {
      if (response) {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        return true;
      } else {
        return false;
      }
    });
  }

  authHeader() {
    const user = localStorage.getItem("accesstoken");
    // TODO
    if (user) {
      return { Authorization: "Bearer " + user };
    } else {
      return {};
    }
  }
}

export default new AuthService();
