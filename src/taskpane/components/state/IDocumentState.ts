import TaskList from "../../../word/TaskList";
import QrCode from "../../../word/QrCode";

export default interface IDocumentState {
  taskList: TaskList;
  qrCode: QrCode;
}
