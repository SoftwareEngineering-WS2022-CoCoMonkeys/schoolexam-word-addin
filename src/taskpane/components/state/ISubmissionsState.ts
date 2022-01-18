import RequestStatus from "./RequestStatus";

export default interface ISubmissionsState {
  submissions: string[];
  uploadSubmissionsStatus: RequestStatus;
  addSubmissionsStatus: RequestStatus;
}
