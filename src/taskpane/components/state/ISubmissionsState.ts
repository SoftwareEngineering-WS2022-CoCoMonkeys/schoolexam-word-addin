import RequestStatus from "./RequestStatus";
import Submission from "../../../model/Submission";

export default interface ISubmissionsState {
  submissions: Submission[];
  uploadSubmissionsStatus: RequestStatus;
  addSubmissionsStatus: RequestStatus;
}
