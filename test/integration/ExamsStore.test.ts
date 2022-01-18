// MOCK SETUP
import { mockFetch } from "./MockSetup";

import { examsStore } from "../../src/taskpane/components/state/ExamsStore";
import RequestStatus from "../../src/taskpane/components/state/RequestStatus";
import { jest } from "@jest/globals";
import { v4 as uuidv4 } from "uuid";

import { HttpMethod } from "../../src/taskpane/components/services/ApiService";
import ExamDTO from "../../src/export_dto/ExamDTO";
import IExamsState from "../../src/taskpane/components/state/IExamsState";

// @ts-ignore
const examsState: IExamsState = {};

beforeEach(() => {
  // Copy inital state
  Object.assign(examsState, examsStore.initialState);
});

afterEach(() => {
  jest.clearAllMocks();
});

const setState = jest.fn((newState) => Object.assign(examsState, newState));
const getState = jest.fn(() => examsState);
const dispatch = jest.fn((thunk) => thunk({ setState, getState, dispatch }));

describe("loadExams()", () => {
  const loadExamsThunk = examsStore.actions.loadExams();

  const mockExams = [
    {
      id: uuidv4(),
      status: "Planned",
      title: "2. Schulaufgabe",
      topic: "Informatik",
      date: new Date().toUTCString(),
      participants: [],
    },
  ];

  describe("when successfull", () => {
    beforeAll(() => {
      mockFetch([
        {
          url: "https://cocomonkeys-schoolexam.herokuapp.com/exam/byteacher",
          method: HttpMethod.GET,
          response: mockExams,
        },
      ]);
    });
    test("should set status thrice", async () => {
      await loadExamsThunk({ dispatch });
      // status is updated twice, examlist once
      expect(setState).toHaveBeenCalledTimes(3);
    });
    test("should result in success status", async () => {
      await loadExamsThunk({ dispatch });
      expect(getState().examsStatus).toBe(RequestStatus.SUCCESS);
    });
    test("should set exams in state", async () => {
      await loadExamsThunk({ dispatch });
      // convert back to DTO objects
      expect(getState().exams.map((exam) => ExamDTO.fromModel(exam))).toEqual(mockExams);
    });
  });

  describe("when invalid response", () => {
    beforeAll(() => {
      mockFetch([
        {
          url: "https://cocomonkeys-schoolexam.herokuapp.com/exam/byteacher",
          method: HttpMethod.GET,
          response: [],
          responseStatus: 500,
        },
      ]);
    });
    test("should set status thrice", async () => {
      await loadExamsThunk({ dispatch });
      // status is updated twice, examList is NOT updated
      expect(setState).toHaveBeenCalledTimes(2);
    });
    test("should result in error status", async () => {
      await loadExamsThunk({ dispatch });
      expect(getState().examsStatus).toBe(RequestStatus.ERROR);
    });
    test("should not set exams in state", async () => {
      await loadExamsThunk({ dispatch });
      // convert back to DTO objects
      expect(getState().exams).toEqual([]);
    });
  });
});

describe("rerender()", () => {
  const rerenderThunk = examsStore.actions.rerender();

  test("should create new state", async () => {
    await rerenderThunk({ getState, dispatch });
    expect(getState().exams).not.toStrictEqual(examsState);
  });
});

describe("clean()", () => {
  // @ts-ignore
  const mockExam = Object.assign(new ExamDTO(), {
    id: uuidv4(),
    status: "Planned",
    title: "2. Schulaufgabe",
    topic: "Informatik",
    date: new Date().toUTCString(),
    participants: [],
  });

  const cleanThunk = examsStore.actions.clean();

  describe("when successfull", () => {
    beforeAll(() => {
      mockFetch([
        {
          url: `https://cocomonkeys-schoolexam.herokuapp.com/exam/${mockExam.id}/clean`,
          method: HttpMethod.POST,
          response: {},
        },
      ]);
    });

    beforeEach(() => {
      //set selected exam
      examsState.selectedExam = mockExam.toModel();
    });

    test("should result in success status", async () => {
      console.log(examsState.selectedExam);
      await cleanThunk({ getState, dispatch });
      expect(getState().cleanStatus).toBe(RequestStatus.SUCCESS);
    });
  });

  describe("when no exam selected", () => {
    beforeAll(() => {
      mockFetch([
        {
          url: `https://cocomonkeys-schoolexam.herokuapp.com/exam/${mockExam.id}/clean`,
          method: HttpMethod.POST,
          response: {},
        },
      ]);
    });

    test("should result in error status", async () => {
      await cleanThunk({ getState, dispatch });
      expect(getState().cleanStatus).toBe(RequestStatus.ERROR);
    });
  });

  describe("when invalid response", () => {
    beforeAll(() => {
      mockFetch([
        {
          url: `https://cocomonkeys-schoolexam.herokuapp.com/exam/${mockExam.id}/clean`,
          method: HttpMethod.POST,
          response: {},
          responseStatus: 404,
        },
      ]);
    });

    test("should result in error status", async () => {
      await cleanThunk({ getState, dispatch });
      expect(getState().cleanStatus).toBe(RequestStatus.ERROR);
    });
  });
});
