import Exam from "../../../model/Exam";
import Build from "../../../model/Build";
import ITaskList from "../../../word/ITaskList";

export default interface IExamsRepository {
  getExams(): Promise<Exam[]>;

  getBuild(examId: string): Promise<Build>;

  setTaskPdf(examId: string, taskPdf: string, taskList: ITaskList): Promise<Response>;

  clean(examId: string): Promise<Response>;
}
