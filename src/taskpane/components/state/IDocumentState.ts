import ITaskList from "../../../word/ITaskList";
import IQrCode from "../../../word/IQrCode";

export default interface IDocumentState {
  taskList: ITaskList;
  qrCode: IQrCode;
}
