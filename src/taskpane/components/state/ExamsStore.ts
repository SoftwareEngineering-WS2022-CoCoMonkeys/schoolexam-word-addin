import { createHook, createStore } from "react-sweet-state";
import Exam, { ExamStatus } from "../../../import_dto/Exam";
import Build from "../../../import_dto/Build";
import RequestStatus from "./RequestStatus";
import PdfService from "../services/PdfService";
import downloadFileBase64 from "../services/DownloadService";
import ExamsRepository from "../services/OnlineExamsRepository";
import TemplateDTO from "../../../export_dto/TemplateDTO";
import TaskDTO from "../../../export_dto/TaskDTO";
import IExamsState from "./IExamsState";

// ACTIONS
const setTaskPdf = (taskPdf: string | null) => {
  return ({ setState }) => {
    setState({ taskPdf });
  };
};

const setBuild = (build: Build | null) => {
  return ({ setState }) => {
    setState({ build });
  };
};

const setExams = (exams: Exam[]) => {
  return ({ setState }) => {
    setState({ exams });
  };
};

const setConversionStatus = (conversionStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ conversionStatus });
  };
};

const setExportStatus = (exportStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ exportStatus });
  };
};

const setBuildStatus = (buildStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ buildStatus });
  };
};

const setExamsStatus = (examsStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ examsStatus });
  };
};

const setCleanStatus = (cleanStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ cleanStatus });
  };
};

const setSelectedExam = (selectedExam: Exam) => {
  return ({ setState }) => {
    setState({ selectedExam });
  };
};

const convertToPdf = () => {
  return async ({ dispatch }) => {
    // get pdf
    try {
      const pdfBase64: string = await PdfService.getDocument();
      dispatch(setTaskPdf(pdfBase64));
      dispatch(setConversionStatus(RequestStatus.SUCCESS));

      // download pdf
      downloadFileBase64("application/pdf", "exam.pdf", pdfBase64);
    } catch (e) {
      console.warn("PDF conversion failed with reason:", e);
      dispatch(setConversionStatus(RequestStatus.ERROR));
    }
  };
};

const build = () => {
  return async ({ getState, dispatch }) => {
    dispatch(setBuildStatus(RequestStatus.WAITING));
    try {
      const build = await ExamsRepository.getBuild(getState().selectedExam.id);
      dispatch(setBuild(build));
      dispatch(setBuildStatus(RequestStatus.SUCCESS));

      // download buildpdf
      downloadFileBase64("application/pdf", "build.pdf", build.pdfFile);
      // download QR code etiquettes
      downloadFileBase64("application/pdf", "qrcodes.pdf", build.qrCodePdfFile);

      // Reload exams to get most recent state
      dispatch(loadExams());
    } catch (e) {
      console.warn("Build failed with reason:", e);
      dispatch(setBuildStatus(RequestStatus.ERROR));
    }
  };
};

const exportTaskPdf = (tasks: TaskDTO[]) => {
  return async ({ getState, dispatch }) => {
    dispatch(setExportStatus(RequestStatus.WAITING));

    // If the exam has been built already (is SubmissinReady), we have to clean it first
    if (getState().selectedExam.status === ExamStatus.SubmissionReady) {
      console.debug("Cleaning exam before rebuild...");
      await dispatch(clean());
    }

    const exportData = new TemplateDTO(getState().taskPdf, tasks);
    try {
      await ExamsRepository.setTaskPdf(getState().selectedExam.id, exportData);
      dispatch(setExportStatus(RequestStatus.SUCCESS));

      // Reload exams to get most recent state
      dispatch(loadExams());
    } catch (e) {
      console.warn("Export failed with reason", e);
      dispatch(setExportStatus(RequestStatus.ERROR));
    }
  };
};

const loadExams = () => {
  return async ({ dispatch }) => {
    dispatch(setExamsStatus(RequestStatus.WAITING));
    try {
      const exams = await ExamsRepository.getExams();
      dispatch(setExams(exams));
      dispatch(setExamsStatus(RequestStatus.SUCCESS));
    } catch (e) {
      console.warn("Exams retrieval failed with reason:", e);
      dispatch(setExamsStatus(RequestStatus.ERROR));
    }
  };
};

const clean = () => {
  return async ({ getState, dispatch }) => {
    dispatch(setCleanStatus(RequestStatus.WAITING));
    try {
      await ExamsRepository.clean(getState().selectedExam.id);
      dispatch(setCleanStatus(RequestStatus.SUCCESS));
    } catch (e) {
      console.warn("Cleaning failed with reason:", e);
      dispatch(setCleanStatus(RequestStatus.ERROR));
    }
  };
};

const rerender = () => {
  return ({ getState, dispatch }) => {
    dispatch(setExams([].concat(getState().exams)));
  };
};

// STORE INITIALIZATION
const examsStore = createStore({
  initialState: <IExamsState>{
    selectedExam: null,
    taskPdf: null,
    build: null,
    exams: [],
    conversionStatus: RequestStatus.IDLE,
    buildStatus: RequestStatus.IDLE,
    exportStatus: RequestStatus.IDLE,
    examsStatus: RequestStatus.IDLE,
    cleanStatus: RequestStatus.IDLE,
  },
  actions: {
    // PUBLIC ACTIONS
    setSelectedExam,
    setConversionStatus,
    setExportStatus,
    setBuildStatus,
    loadExams,
    convertToPdf,
    build,
    exportTaskPdf,
    rerender,
    clean,
  },
  name: "exams-store",
});

// HOOK EXPORT
const useExams = createHook(examsStore);
export default useExams;

// SELECTORS
