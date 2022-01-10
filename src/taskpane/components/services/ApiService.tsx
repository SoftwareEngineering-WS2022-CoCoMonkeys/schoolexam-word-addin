import AuthService from "./AuthService";
import Exam from "../../../model/Exam";
import ExportModel from "../../../model/ExportModel";

export default class ApiService {
  private static readonly BASE_URL = "https://cocomonkeys-schoolexam.herokuapp.com";

  static api(method: string, url: string, data?: any): Promise<any> {
    const config: RequestInit = {
      method: method,
      headers: AuthService.authHeader(),
    };
    if (data) {
      // @ts-ignore
      config.body = JSON.stringify(data);
      config.headers = { ...config.headers, "Content-Type": "application/json" };
    }
    return fetch(this.BASE_URL + url, config).then((response) => {
      if (response.status === 200) {
        console.debug(`${url} returned code ${response.status}-${response.statusText}, body: ${response.body}`);
        return response;
      } else {
        console.error(`${url} returned code ${response.status}-${response.statusText}`);
        return null;
      }
    });
  }

  static getExams(): Promise<Exam[]> {
    return this.api("GET", "/Exam/ByTeacher")
      .then((response) => response.json())
      .then((jsonArr) => jsonArr.map((examObj) => Exam.fromImport(examObj)));
  }

  static postExamPdf(examId: string, exportData: ExportModel): Promise<number> {
    return this.api("POST", `/Exam/${examId}/UploadTaskPdf`, exportData).then((response) => {
      return response.status;
    });
  }
}
