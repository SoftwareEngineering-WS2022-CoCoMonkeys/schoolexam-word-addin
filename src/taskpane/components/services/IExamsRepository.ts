import Exam from "../../../import_dto/Exam";
import Build from "../../../import_dto/Build";
import TemplateDTO from "../../../export_dto/TemplateDTO";

export default interface IExamsRepository {
  getExams(): Promise<Exam[]>;

  getBuild(examId: string): Promise<Build>;

  setTaskPdf(examId: string, data: TemplateDTO): Promise<Response>;

  clean(examId: string): Promise<Response>;
}
