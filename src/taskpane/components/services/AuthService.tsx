import axios from "axios";

axios.defaults.baseURL = "https://cocomonkeys-schoolexam.herokuapp.com";

class AuthService {
  private readonly AUTH_URL = "Authentication/Authenticate";

  login(username: string, password: string): Promise<boolean> {
    return axios.post(this.AUTH_URL, { username, password }).then((response) => {
      if (response) {
        console.log(response.data);
        localStorage.setItem("userJwt", response.data);
        return true;
      } else {
        return false;
      }
    });
  }

  authHeader() {
    const userJwt = localStorage.getItem("userJwt");
    // TODO
    if (userJwt) {
      return { Authorization: "Bearer " + userJwt };
    } else {
      return {};
    }
  }
}

export default new AuthService();
