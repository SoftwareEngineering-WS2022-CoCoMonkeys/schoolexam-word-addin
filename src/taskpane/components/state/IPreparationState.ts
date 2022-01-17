import QrCode from "../../../word/QrCode";
import Exam from "../../../import_dto/Exam";
import Build from "../../../import_dto/Build";

export default interface IPreparationState {
  selectedExam: Exam | null;
  qrCode: QrCode;
  taskPdf: string | null;
  build: Build | null;
}
