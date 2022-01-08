import axios from "axios";
import AuthService from "./AuthService";
import Exam from "../../../model/Exam";

class ApiService {
  private readonly API_URL = "33.196.27:55011"; //TODO

  async getExams(): Promise<Exam[]> {
    /* return Promise.resolve(
       new Array(7).fill(new Exam("e001", "Projektmanagement", "planned", new Date(), "Sozialwissenschaften"))
     );*/
    return axios
      .get(`${this.API_URL}/Course/ByTeacher`, {
        headers: AuthService.authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("good");
          console.log(response);
          return [new Exam("2341", "12321", "fsfs", new Date(), "math")];
        } else {
          console.log("error");
          return null;
        }
      });
  }
}

export default new ApiService();
