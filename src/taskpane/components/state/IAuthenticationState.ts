import RequestStatus from "./RequestStatus";
import Authentication from "../../../model/Authentication";

/**
 * Global authentication-related state.
 */
export default interface IAuthenticationState {
  /** Whether the login page should be displayed or not */
  displayLogin: boolean;
  /** Authentication data (if available) */
  authData: Authentication | null;
  /** The status of the current login request, {@link RequestStatus.IDLE} if idle */
  loginStatus: RequestStatus;
}
