import RequestStatus from "./RequestStatus";
import Submission from "../model/Submission";

/**
 * Global submissions-related state
 */
export default interface ISubmissionsState {
  /** All outstanding submissions (saved in-memory, not uploaded) */
  submissions: Submission[];
  /** The status of the current submissions upload request, {@link RequestStatus.IDLE} if idle */
  uploadSubmissionsStatus: RequestStatus;
  /** The status of the current submissions addition, {@link RequestStatus.IDLE} if idle */
  addSubmissionsStatus: RequestStatus;
}
