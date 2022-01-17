import Authentication from "../../../import_dto/Authentication";
import RequestStatus from "./RequestStatus";

export default interface IAuthenticationState {
  displayLogin: boolean;
  authData?: Authentication;
  loginStatus: RequestStatus;
}
