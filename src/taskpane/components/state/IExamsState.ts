import Exam from "../../../model/Exam";
import Build from "../../../model/Build";
import RequestStatus from "./RequestStatus";

export default interface IExamsState {
  selectedExam: Exam | null;
  taskPdf: string | null;
  build: Build | null;
  exams: Exam[];
  conversionStatus: RequestStatus;
  buildStatus: RequestStatus;
  exportStatus: RequestStatus;
  examsStatus: RequestStatus;
  cleanStatus: RequestStatus;
}
