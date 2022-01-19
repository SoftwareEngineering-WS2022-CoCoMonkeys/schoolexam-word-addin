// MOCK SETUP
import { mockFetch } from "./MockSetup";
import RequestStatus from "../../src/taskpane/components/state/RequestStatus";
import { jest } from "@jest/globals";
import { v4 as uuidv4 } from "uuid";

import { HttpMethod } from "../../src/taskpane/components/services/ApiService";
import Exam, { ExamStatus } from "../../src/model/Exam";
import ISubmissionsState from "../../src/taskpane/components/state/ISubmissionsState";
import { submissionsStore } from "../../src/taskpane/components/state/SubmissionsStore";
import Submission from "../../src/model/Submission";

// SET UP MICROSTORE
// @ts-ignore
const submissionsState: ISubmissionsState = {};

beforeEach(() => {
  // Copy inital state
  Object.assign(submissionsState, submissionsStore.initialState);
});

afterEach(() => {
  jest.clearAllMocks();
});

const setState = jest.fn((newState) => Object.assign(submissionsState, newState));
const getState = jest.fn(() => submissionsState);
const dispatch = jest.fn((thunk: (any) => void) => thunk({ setState, getState, dispatch }));

// SETbUP MOCK OBJECTS
const currentDate = new Date();
currentDate.setMilliseconds(0);
const mockExam = new Exam(uuidv4(), ExamStatus.Planned, "2. Schulaufgabe", currentDate, "Informatik", []);

const mockSubmission = new Submission("ABCDEFG", mockExam.id);

// TESTS GROUPED BY ACTION
describe("uploadSubmissions()", () => {
  const uploadSubmissionsThunk = submissionsStore.actions.uploadSubmissions();

  beforeEach(() => {
    submissionsState.submissions = [mockSubmission];
  });

  describe("when successfull", () => {
    beforeAll(() => {
      mockFetch([
        {
          url: `https://cocomonkeys-schoolexam.herokuapp.com/submission/upload/${mockExam.id}`,
          method: HttpMethod.POST,
          response: {},
          responseStatus: 200,
        },
      ]);
    });
    test("should result in success status", async () => {
      await uploadSubmissionsThunk({ getState, dispatch });
      expect(getState().uploadSubmissionsStatus).toBe(RequestStatus.SUCCESS);
    });
    test("should remove submissions from state", async () => {
      await uploadSubmissionsThunk({ getState, dispatch });
      // convert back to DTO objects
      expect(getState().submissions).toEqual([]);
    });
  });

  describe("when invalid response", () => {
    beforeAll(() => {
      mockFetch([
        {
          url: `https://cocomonkeys-schoolexam.herokuapp.com/submission/upload/${mockExam.id}`,
          method: HttpMethod.POST,
          response: {},
          responseStatus: 500,
        },
      ]);
    });
    test("should result in error status", async () => {
      await uploadSubmissionsThunk({ getState, dispatch });
      expect(getState().uploadSubmissionsStatus).toBe(RequestStatus.ERROR);
    });
    test("should not remove submissions from state", async () => {
      await uploadSubmissionsThunk({ getState, dispatch });
      expect(getState().submissions).toEqual([mockSubmission]);
    });
  });
});
