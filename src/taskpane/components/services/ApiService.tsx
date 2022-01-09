import AuthService from "./AuthService";
import Exam from "../../../model/Exam";
import ExportModel from "../../../model/ExportModel";

class ApiService {
  BASE_URL = "https://cocomonkeys-schoolexam.herokuapp.com";
  async api(method: string, url: string, data?: any) {
    const config: RequestInit = {
      method: method,
      headers: AuthService.authHeader(),
    };
    if (data) {
      // @ts-ignore
      config.body = JSON.stringify(data);
    }
    return fetch(this.BASE_URL + url, config).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.error(`${url} returned code ${response.status}-${response.statusText}`);
        return null;
      }
    });
  }

  async getExams(): Promise<Exam[]> {
    return this.api("GET", "/Exam/ByTeacher").then((jsonArr) => jsonArr.map((examObj) => Exam.fromImport(examObj)));
  }

  async postExamPdf(examId: string, exportData: ExportModel): Promise<number> {
    return this.api("POST", `Exam/${examId}/UploadTaskPdf`, exportData).then((response) => {
      return response.status;
    });
  }
}

export default new ApiService();
