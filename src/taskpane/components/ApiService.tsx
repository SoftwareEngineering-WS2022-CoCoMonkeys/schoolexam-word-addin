import axios from "axios";
import AuthService from "./login/AuthService";
import Exam from "../../model/Exam";

class ApiService {
  private readonly API_URL = "localhost"; //TODO

  async getExams(): Promise<Exam[]> {
    return Promise.resolve(
      new Array(7).fill(new Exam("e001", "Projektmanagement", "planned", new Date(), "Sozialwissenschaften"))
    );
    /*return axios
      .get(`${this.API_URL}`, {
        headers: AuthService.authHeader(),
      })
      .then((result) => {
        if (result.status === 200) {
          console.log("good");
          return [new Exam("2341", "12321", "fsfs", new Date(), "math")];
        } else {
          console.log("error");
          return null;
        }
      });

     */
  }
}

export default new ApiService();
