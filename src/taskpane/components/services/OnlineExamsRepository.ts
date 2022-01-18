import Exam from "../../../model/Exam";
import Build from "../../../model/Build";
import ApiService, { HttpMethod } from "./ApiService";
import IExamsRepository from "./IExamsRepository";
import BuildDTO from "../../../dto/BuildDTO";
import TemplateDTO from "../../../dto/TemplateDTO";
import ITaskList from "../../../word/ITaskList";

class OnlineExamsRepository implements IExamsRepository {
  getExams(): Promise<Exam[]> {
    return ApiService.request(HttpMethod.GET, "/Exam/ByTeacher")
      .then((response) => response.json())
      .then((jsonArr) => jsonArr.map((e) => Exam.fromJson(JSON.stringify(e))));
  }

  getBuild(examId: string): Promise<Build> {
    return ApiService.request(HttpMethod.POST, `/Exam/${examId}/Build`)
      .then((response) => response.json())
      .then((json) => BuildDTO.fromJson(JSON.stringify(json)).toModel());
  }

  setTaskPdf(examId: string, taskPdf: string, taskList: ITaskList): Promise<Response> {
    const data = TemplateDTO.fromModel(taskPdf, taskList);
    return ApiService.request(HttpMethod.POST, `/Exam/${examId}/UploadTaskPdf`, data);
  }

  clean(examId: string): Promise<Response> {
    return ApiService.request(HttpMethod.POST, `/Exam/${examId}/Clean`);
  }
}

const ExamsRepository = new OnlineExamsRepository();
export default ExamsRepository;
