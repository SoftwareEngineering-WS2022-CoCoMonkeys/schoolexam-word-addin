import Exam from "../../../model/Exam";
import Build from "../../../model/Build";
import ApiService, { HttpMethod } from "./ApiService";
import IExamsRepository from "./IExamsRepository";
import ExamDTO from "../../../export_dto/ExamDTO";
import BuildDTO from "../../../dto/BuildDTO";
import TemplateDTO from "../../../dto/TemplateDTO";
import ITaskList from "../../../word/ITaskList";

/**
 * Exams repository that uses the deployed SchoolExam backend.
 */
class OnlineExamsRepository implements IExamsRepository {
  /**
   * @inheritDoc
   * @returns The HTTP response wrapped in a Promise.
   */
  getExams(): Promise<Exam[]> {
    return ApiService.request(HttpMethod.GET, "/Exam/ByTeacher")
      .then((response) => response.json())
      .then((jsonArr) => jsonArr.map((e) => ExamDTO.fromJson(JSON.stringify(e)).toModel()));
  }

  /**
   * @inheritDoc
   * @returns The HTTP response wrapped in a Promise.
   */
  getBuild(examId: string): Promise<Build> {
    return ApiService.request(HttpMethod.POST, `/Exam/${examId}/Build`)
      .then((response) => response.json())
      .then((json) => BuildDTO.fromJson(JSON.stringify(json)).toModel());
  }

  /**
   * @inheritDoc
   * @returns The HTTP response wrapped in a Promise.
   */
  setTaskPdf(examId: string, taskPdf: string, taskList: ITaskList): Promise<Response> {
    const data = TemplateDTO.fromModel(taskPdf, taskList);
    return ApiService.request(HttpMethod.POST, `/Exam/${examId}/UploadTaskPdf`, data);
  }

  /**
   * @inheritDoc
   * @returns The HTTP response wrapped in a Promise.
   */
  clean(examId: string): Promise<Response> {
    return ApiService.request(HttpMethod.POST, `/Exam/${examId}/Clean`);
  }
}

// Singleton instantiation
const ExamsRepository = new OnlineExamsRepository();
export default ExamsRepository;
