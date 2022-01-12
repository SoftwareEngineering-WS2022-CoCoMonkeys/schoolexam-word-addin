import AuthService from "./AuthService";
import Exam from "../../../model/Exam";
import TemplateDTO from "../../../dto/TemplateDTO";

export default class ApiService {
  private static readonly BASE_URL = "https://cocomonkeys-schoolexam.herokuapp.com";

  static api(method: string, url: string, data?: unknown): Promise<Response> {
    const config: RequestInit = {
      method: method,
      // includes JWT for authentication
      headers: AuthService.authHeader(),
    };
    if (data) {
      config.body = JSON.stringify(data);
      // default to JSON
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

  static triggerBuild(examId: string, count: number): Promise<Response> {
    return this.api("POST", `/Exam/${examId}/Build`, { count });
  }

  static postExamPdf(examId: string, exportData: TemplateDTO): Promise<Response> {
    return this.api("POST", `/Exam/${examId}/UploadTaskPdf`, exportData);
  }
}
