import RequestStatus from "./RequestStatus";
import Authentication from "../../../model/Authentication";

export default interface IAuthenticationState {
  displayLogin: boolean;
  authData: Authentication | null;
  loginStatus: RequestStatus;
}
