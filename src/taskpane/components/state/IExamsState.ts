import Exam from "../../../import_dto/Exam";
import Build from "../../../import_dto/Build";
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
