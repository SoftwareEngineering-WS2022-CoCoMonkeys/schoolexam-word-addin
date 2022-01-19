import Exam from "../../../model/Exam";
import Build from "../../../model/Build";
import RequestStatus from "./RequestStatus";

/**
 * Global exams-related state.
 */
export default interface IExamsState {
  /** The currently selected exam */
  selectedExam: Exam | null;
  /** The base64-encoded PDF of the document with task start/end data embedded into it */
  taskPdf: string | null;
  /** The latest build data received */
  build: Build | null;
  /** The list of available exams */
  exams: Exam[];
  /** The status of the current PDF conversion request, {@link RequestStatus.IDLE} if idle */
  conversionStatus: RequestStatus;
  /** The status of the current build request, {@link RequestStatus.IDLE} if idle */
  buildStatus: RequestStatus;
  /** The status of the current export request, {@link RequestStatus.IDLE} if idle */
  exportStatus: RequestStatus;
  /** The status of the current exam retrieval request, {@link RequestStatus.IDLE} if idle */
  examsStatus: RequestStatus;
  /** The status of the current exam cleaning request, {@link RequestStatus.IDLE} if idle */
  cleanStatus: RequestStatus;
}
