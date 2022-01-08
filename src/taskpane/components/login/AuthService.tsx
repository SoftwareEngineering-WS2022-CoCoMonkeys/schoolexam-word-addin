import axios from "axios";

axios.defaults.baseURL = "https://cocomonkeys-schoolexam.herokuapp.com/";

class AuthService {
  private readonly AUTH_URL = "Authentication/Authenticate";

  login(username: string, password: string): Promise<boolean> {
    return fetch("https://cocomonkeys-schoolexam.herokuapp.com/" + this.AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      console.log(response);
      return true;
    });
    /*
    return axios.post(this.AUTH_URL, { username, password }).then((response) => {
      if (response) {
        console.log(response);
        localStorage.setItem("userJwt", JSON.stringify(response.data));
        return true;
      } else {
        return false;
      }
    });

     */
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
