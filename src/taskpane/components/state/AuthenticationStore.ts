import { createHook, createStore } from "react-sweet-state";
import IAuthenticationState from "./IAuthenticationState";
import RequestStatus from "./RequestStatus";
import AuthentificationRepository from "../services/OnlineAuthenticationRepository";
import Authentication from "../../../model/Authentication";

// ACTIONS
/**
 * @param displayLogin Whether to display the login form..
 */
const setDisplayLoginPage = (displayLogin: boolean) => {
  return ({ setState }) => {
    setState({ displayLogin });
  };
};

/**
 * @param loginStatus The new login status.
 */
const setLoginStatus = (loginStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ loginStatus });
  };
};

/**
 * @param authData The new authentication data.
 */
const setAuthData = (authData: Authentication) => {
  return ({ setState }) => {
    setState({ authData });
  };
};

/**
 * Attempt a login with the supplied username and password.
 * @param username
 * @param password
 */
const login = (username: string, password: string) => {
  return async ({ dispatch }) => {
    dispatch(setLoginStatus(RequestStatus.WAITING));
    try {
      const authData = await AuthentificationRepository.login(username, password);
      dispatch(setAuthData(authData));
      dispatch(setLoginStatus(RequestStatus.SUCCESS));
      setTimeout(() => {
        dispatch(setLoginStatus(RequestStatus.IDLE));
        dispatch(setDisplayLoginPage(false));
      }, 1000);
    } catch (e) {
      console.warn("Login failed with reason:", e);
      dispatch(setLoginStatus(RequestStatus.ERROR));
    }
  };
};

// STORE INITIALIZATION
/**
 * The authentication MicroStore.
 */
export const authenticationStore = createStore({
  initialState: <IAuthenticationState>{
    displayLogin: false,
    authData: null,
    loginStatus: RequestStatus.IDLE,
  },
  // PUBLIC ACTIONS
  actions: {
    setDisplayLoginPage,
    setLoginStatus,
    login,
  },
  name: "authentication-store",
});

// HOOK EXPORT

/**
 * Custom React Hook that grants access to the authentication MicroStore.
 * In particular, exposes the {@link IAuthenticationState} and login-related actions.
 */
const useAuth = createHook(authenticationStore);
export default useAuth;

// SELECTORS

const isLoggedIn = (state: IAuthenticationState) => state.authData != null;
/**
 * Custom React Hook that signals whether the user is currently logged in.
 * Also exposes the store's actions.
 */
export const useLoggedIn = createHook(authenticationStore, {
  selector: isLoggedIn,
});
