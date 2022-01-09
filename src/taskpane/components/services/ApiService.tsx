import axios from "axios";
import AuthService from "./AuthService";
import Exam from "../../../model/Exam";
import ExportModel from "../../../model/ExportModel";

class ApiService {
  async getExams(): Promise<Exam[]> {
    return Promise.resolve(
      new Array(7).fill(new Exam("e001", "Projektmanagement", "planned", new Date(), "Sozialwissenschaften"))
    );
    /*
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
      */
  }

  async postExamPdf(examId: string, exportData: ExportModel): Promise<number> {
    return axios
      .post(`Exam/${examId}/UploadTaskPdf`, exportData, {
        headers: AuthService.authHeader(),
      })
      .then((response) => {
        console.log(response.data);
        return response.status;
      });
  }
}

export default new ApiService();
