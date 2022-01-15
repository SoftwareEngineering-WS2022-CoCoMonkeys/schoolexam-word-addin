import QrCode from "../../../word/QrCode";
import Exam from "../../../import_dto/Exam";
import Authentication from "../../../import_dto/Authentication";
import Build from "../../../import_dto/Build";

export default interface IPreparationState {
  selectedExam: Exam | null;
  qrCode: QrCode;
  displayLogin: boolean;
  authData: Authentication;
  loggedIn: boolean;
  taskPdf: string | null;
  build: Build | null;
}
