import AuthService from "./AuthService";
import Exam from "../../../import_dto/Exam";
import TemplateDTO from "../../../export_dto/TemplateDTO";
import Build from "../../../import_dto/Build";

export enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export default class ApiService {
  private static readonly BASE_URL = "https://cocomonkeys-schoolexam.herokuapp.com";

  static api(method: HttpMethod, url: string, data?: unknown): Promise<Response> {
    const config: RequestInit = {
      method: method.toString(),
      // includes JWT for authentication
      headers: AuthService.authHeader(),
    };
    if (data) {
      config.body = JSON.stringify(data);
      // default to JSON
      config.headers = { ...config.headers, "Content-Type": "application/json" };
    }
    return fetch(this.BASE_URL + url, config).then((response) => {
      switch (response.status) {
        case 200:
        case 201:
        case 204: {
          console.debug(
            `${method} ${url} returned code ${response.status}-${response.statusText}, body: ${response.body}`
          );
          return response;
        }
        default:
          throw new Error(`${method} ${url} returned code ${response.status}-${response.statusText}`);
      }
    });
  }

  static getExams(): Promise<Exam[]> {
    return this.api(HttpMethod.GET, "/Exam/ByTeacher")
      .then((response) => response.json())
      .then((jsonArr) => jsonArr.map((e) => Exam.fromJson(JSON.stringify(e))));
  }

  static getBuild(examId: string): Promise<Build> {
    return this.api(HttpMethod.POST, `/Exam/${examId}/Build`)
      .then((response) => response.json())
      .then((json) => Build.fromJson(JSON.stringify(json)));
  }

  static postExamPdf(examId: string, exportData: TemplateDTO): Promise<Response> {
    return this.api(HttpMethod.POST, `/Exam/${examId}/UploadTaskPdf`, exportData);
  }
}
