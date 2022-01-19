import ITaskList from "../word/ITaskList";
import IQrCode from "../word/IQrCode";

/**
 * Global document-related state
 */
export default interface IDocumentState {
  /** The tasks associated with the document */
  taskList: ITaskList;
  /** The QR-Codes associated with the document */
  qrCode: IQrCode;
}
