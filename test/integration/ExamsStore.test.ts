// MOCK SETUP
import { mockFetch } from "./MockSetup";

import { examsStore } from "../../src/taskpane/components/state/ExamsStore";
import RequestStatus from "../../src/taskpane/components/state/RequestStatus";
import { jest } from "@jest/globals";
import { v4 as uuidv4 } from "uuid";

import { HttpMethod } from "../../src/taskpane/components/services/ApiService";
import ExamDTO from "../../src/dto/ExamDTO";
import IExamsState from "../../src/taskpane/components/state/IExamsState";
import Task from "../../src/word/Task";
import TaskList from "../../src/word/TaskList";
import Exam, { ExamStatus } from "../../src/model/Exam";
import Build from "../../src/model/Build";
import BuildDTO from "../../src/dto/BuildDTO";

// SET UP MICROSTORE
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
const dispatch = jest.fn((thunk: (any) => void) => thunk({ setState, getState, dispatch }));

// SETUP MOCK OBJECTS
const currentDate = new Date();
currentDate.setMilliseconds(0);
const mockExam = new Exam(uuidv4(), ExamStatus.Planned, "2. Schulaufgabe", currentDate, "Informatik", []);

const mockTaskList = new TaskList();
mockTaskList.tasks.push(new Task(uuidv4(), "Aufgabe 1", 3, null, null, null));

// base64
const mockTaskPdf = "ABCDEFGH";

const mockBuild = new Build(10, "123456", "ABCDEF");

// TESTS GROUPED BY ACTION
describe("loadExams()", () => {
  const loadExamsThunk = examsStore.actions.loadExams();

  describe("when successfull", () => {
    beforeAll(() => {
      mockFetch([
        {
          url: "https://cocomonkeys-schoolexam.herokuapp.com/exam/byteacher",
          method: HttpMethod.GET,
          response: [ExamDTO.fromModel(mockExam)],
        },
      ]);
    });
    test("should result in success status", async () => {
      await loadExamsThunk({ dispatch });
      expect(getState().examsStatus).toBe(RequestStatus.SUCCESS);
    });
    test("should set exams in state", async () => {
      await loadExamsThunk({ dispatch });
      // convert back to DTO objects
      expect(getState().exams).toEqual([mockExam]);
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
    test("should result in error status", async () => {
      await loadExamsThunk({ dispatch });
      expect(getState().examsStatus).toBe(RequestStatus.ERROR);
    });
    test("should not set exams in state", async () => {
      await loadExamsThunk({ dispatch });
      expect(getState().exams).toEqual([]);
    });
  });
});

describe("rerender()", () => {
  const rerenderThunk = examsStore.actions.forceRerender();

  test("should create new state", async () => {
    await rerenderThunk({ getState, dispatch });
    expect(getState().exams).not.toStrictEqual(examsState);
  });
});

describe("clean()", () => {
  const cleanThunk = examsStore.actions.clean();

  beforeEach(() => {
    //set selected exam
    examsState.selectedExam = mockExam;
  });

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

    test("should result in success status", async () => {
      await cleanThunk({ getState, dispatch });
      expect(getState().cleanStatus).toBe(RequestStatus.SUCCESS);
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

describe("exportTaskPdf()", () => {
  const exportThunk = examsStore.actions.exportTaskPdf(mockTaskList);

  beforeEach(() => {
    // set selected exam
    examsState.selectedExam = mockExam;
    // Set status to planned
    examsState.selectedExam.status = ExamStatus.Planned;
    // set taskPDf
    examsState.taskPdf = mockTaskPdf;
  });

  describe("when successfull", () => {
    beforeAll(() => {
      mockFetch([
        {
          url: `https://cocomonkeys-schoolexam.herokuapp.com/exam/${mockExam.id}/uploadtaskpdf`,
          method: HttpMethod.POST,
          response: {},
          responseStatus: 200,
        },
        {
          url: `https://cocomonkeys-schoolexam.herokuapp.com/exam/byteacher`,
          method: HttpMethod.GET,
          response: [ExamDTO.fromModel(mockExam)],
          responseStatus: 200,
        },
      ]);
    });

    test("should result in success status", async () => {
      await exportThunk({ getState, dispatch });
      expect(getState().exportStatus).toBe(RequestStatus.SUCCESS);
    });
    test("should reload exams successfully", async () => {
      await exportThunk({ getState, dispatch });
      expect(getState().examsStatus).toBe(RequestStatus.SUCCESS);
    });
  });

  describe("when invalid response", () => {
    beforeAll(() => {
      mockFetch([
        {
          url: `https://cocomonkeys-schoolexam.herokuapp.com/exam/${mockExam.id}/uploadtaskpdf`,
          method: HttpMethod.POST,
          response: {},
          responseStatus: 404,
        },
      ]);
    });

    test("should result in error status", async () => {
      await exportThunk({ getState, dispatch });
      expect(getState().exportStatus).toBe(RequestStatus.ERROR);
    });
  });
});

describe("build()", () => {
  const buildThunk = examsStore.actions.build();

  beforeEach(() => {
    // set selected exam
    examsState.selectedExam = mockExam;
    // Set status to planned
    examsState.selectedExam.status = ExamStatus.BuildReady;
  });

  describe("when successfully", () => {
    beforeAll(() => {
      mockFetch([
        {
          url: `https://cocomonkeys-schoolexam.herokuapp.com/exam/${mockExam.id}/build`,
          method: HttpMethod.POST,
          response: BuildDTO.fromModel(mockBuild),
          responseStatus: 200,
        },
        {
          url: `https://cocomonkeys-schoolexam.herokuapp.com/exam/byteacher`,
          method: HttpMethod.GET,
          response: [ExamDTO.fromModel(mockExam)],
          responseStatus: 200,
        },
      ]);
    });

    test("should result in success status", async () => {
      await buildThunk({ getState, dispatch });
      expect(getState().buildStatus).toBe(RequestStatus.SUCCESS);
    });
    test("should reload exams successfully", async () => {
      await buildThunk({ getState, dispatch });
      expect(getState().examsStatus).toBe(RequestStatus.SUCCESS);
    });
    test("should set build accordingly", async () => {
      await buildThunk({ getState, dispatch });
      expect(getState().build).toEqual(mockBuild);
    });
  });

  describe("when invalid response", () => {
    beforeAll(() => {
      mockFetch([
        {
          url: `https://cocomonkeys-schoolexam.herokuapp.com/exam/${mockExam.id}/build`,
          method: HttpMethod.POST,
          response: BuildDTO.fromModel(mockBuild),
          responseStatus: 404,
        },
      ]);
    });

    test("should result in error status", async () => {
      await buildThunk({ getState, dispatch });
      expect(getState().buildStatus).toBe(RequestStatus.ERROR);
    });
  });
});
