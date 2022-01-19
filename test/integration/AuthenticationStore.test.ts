// MOCK SETUP
import { mockFetch } from "./MockSetup";
import RequestStatus from "../../src/taskpane/components/state/RequestStatus";
import { jest } from "@jest/globals";

import { HttpMethod } from "../../src/taskpane/components/services/ApiService";
import IAuthenticationState from "../../src/taskpane/components/state/IAuthenticationState";
import { authenticationStore } from "../../src/taskpane/components/state/AuthenticationStore";
import Authentication from "../../src/model/Authentication";
import User from "../../src/model/User";
import Person from "../../src/model/Person";

// SET UP MICROSTORE
// @ts-ignore
const authenticationState: IAuthenticationState = {};

beforeEach(() => {
  // Copy inital state
  Object.assign(authenticationState, authenticationStore.initialState);
});

afterEach(() => {
  jest.clearAllMocks();
});

const setState = jest.fn((newState) => Object.assign(authenticationState, newState));
const getState = jest.fn(() => authenticationState);
const dispatch = jest.fn((thunk: (any) => void) => thunk({ setState, getState, dispatch }));

// SETUP MOCK OBJECTS
const currentDate = new Date();
currentDate.setMilliseconds(0);
const mockUsername = "brigitte";
const mockPassword = "meinsicherespasswort";
const mockAuthentication = new Authentication(
  "Header.Payload.Secret",
  "Teacher",
  new User(mockUsername, new Person(currentDate, "brigitte@schoolexam.de", "Brigitte", "Schweinebauer"))
);

// TESTS GROUPED BY ACTION
describe("login()", () => {
  describe("when successful", () => {
    const loginThunk = authenticationStore.actions.login(mockUsername, mockPassword);
    beforeAll(() => {
      mockFetch([
        {
          url: `https://cocomonkeys-schoolexam.herokuapp.com/Authentication/Authenticate`,
          method: HttpMethod.POST,
          response: mockAuthentication,
          responseStatus: 200,
          acceptIf: (jsonData: any) =>
            jsonData.username &&
            jsonData.username === mockUsername &&
            jsonData.password &&
            jsonData.password === mockPassword,
        },
      ]);
    });
    test("should result in success status", async () => {
      await loginThunk({ dispatch });
      expect(getState().loginStatus).toBe(RequestStatus.SUCCESS);
    });
    test("should set authData", async () => {
      await loginThunk({ dispatch });
      expect(getState().authData).toEqual(mockAuthentication);
    });
  });

  describe("when invalid credentials", () => {
    const loginThunk = authenticationStore.actions.login(mockUsername, mockPassword + "typo");
    beforeAll(() => {
      mockFetch([
        {
          url: `https://cocomonkeys-schoolexam.herokuapp.com/Authentication/Authenticate`,
          method: HttpMethod.POST,
          response: mockAuthentication,
          responseStatus: 200,
          acceptIf: (jsonData: any) =>
            jsonData.username &&
            jsonData.username === mockUsername &&
            jsonData.password &&
            jsonData.password === mockPassword,
        },
      ]);
    });
    test("should result in error status", async () => {
      await loginThunk({ dispatch });
      expect(getState().loginStatus).toBe(RequestStatus.ERROR);
    });
    test("should not set authData", async () => {
      await loginThunk({ dispatch });
      expect(getState().authData).toEqual(null);
    });
  });
});
