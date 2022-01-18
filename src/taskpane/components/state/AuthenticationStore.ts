import { createHook, createStore } from "react-sweet-state";
import IAuthenticationState from "./IAuthenticationState";
import RequestStatus from "./RequestStatus";
import AuthentificationRepository from "../services/OnlineAuthenticationRepository";
import Authentication from "../../../import_dto/Authentication";

// ACTIONS
const setDisplayLoginPage = (displayLogin: boolean) => {
  return ({ setState }) => {
    setState({ displayLogin });
  };
};

const setLoginStatus = (loginStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ loginStatus });
  };
};

const setAuthData = (authData: Authentication) => {
  return ({ setState }) => {
    setState({ authData });
  };
};

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
const authenticationStore = createStore({
  initialState: <IAuthenticationState>{
    displayLogin: false,
    authData: null,
    loginStatus: RequestStatus.IDLE,
  },
  actions: {
    // PUBLIC ACTIONS
    setDisplayLoginPage,
    setLoginStatus,
    login,
  },
  name: "authentication-store",
});

// HOOK EXPORT
const useAuth = createHook(authenticationStore);
export default useAuth;

// SELECTORS
const isLoggedIn = (state: IAuthenticationState) => state.authData != null;
export const useLoggedIn = createHook(authenticationStore, {
  selector: isLoggedIn,
});
