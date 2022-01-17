import Exam from "../../../import_dto/Exam";
import Build from "../../../import_dto/Build";
import TemplateDTO from "../../../export_dto/TemplateDTO";
import ApiService, { HttpMethod } from "./ApiService";
import IExamsRepository from "./IExamsRepository";

class OnlineExamsRepository implements IExamsRepository {
  getExams(): Promise<Exam[]> {
    return ApiService.request(HttpMethod.GET, "/Exam/ByTeacher")
      .then((response) => response.json())
      .then((jsonArr) => jsonArr.map((e) => Exam.fromJson(JSON.stringify(e))));
  }

  getBuild(examId: string): Promise<Build> {
    return ApiService.request(HttpMethod.POST, `/Exam/${examId}/Build`)
      .then((response) => response.json())
      .then((json) => Build.fromJson(JSON.stringify(json)));
  }

  setTaskPdf(examId: string, data: TemplateDTO): Promise<Response> {
    return ApiService.request(HttpMethod.POST, `/Exam/${examId}/UploadTaskPdf`, data);
  }

  clean(examId: string): Promise<Response> {
    return ApiService.request(HttpMethod.POST, `/Exam/${examId}/Clean`);
  }
}

const ExamsRepository = new OnlineExamsRepository();
export default ExamsRepository;
