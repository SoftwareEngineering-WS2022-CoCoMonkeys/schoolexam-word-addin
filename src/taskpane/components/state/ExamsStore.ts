import { createHook, createStore } from "react-sweet-state";
import Exam, { ExamStatus } from "../../../model/Exam";
import Build from "../../../model/Build";
import RequestStatus from "./RequestStatus";
import PdfService from "../services/PdfService";
import downloadFileBase64 from "../services/DownloadService";
import ExamsRepository from "../services/OnlineExamsRepository";
import IExamsState from "./IExamsState";
import ITaskList from "../../../word/ITaskList";

// ACTIONS

/**
 * @param taskPdf The new PDF of the document with task start/end data embedded into it
 */
const setTaskPdf = (taskPdf: string | null) => {
  return ({ setState }) => {
    setState({ taskPdf });
  };
};
/**
 * @param build The new Build data.
 */
const setBuild = (build: Build | null) => {
  return ({ setState }) => {
    setState({ build });
  };
};
/**
 * @param exams The new exams
 */
const setExams = (exams: Exam[]) => {
  return ({ setState }) => {
    setState({ exams });
  };
};

/**
 * @param conversionStatus The new conversion status.
 */
const setConversionStatus = (conversionStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ conversionStatus });
  };
};

/**
 * @param exportStatus The new export status.
 */
const setExportStatus = (exportStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ exportStatus });
  };
};

/**
 * @param buildStatus The new build status
 */
const setBuildStatus = (buildStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ buildStatus });
  };
};

/**
 * @param examsStatus The new exams retrieval status.
 */
const setExamsStatus = (examsStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ examsStatus });
  };
};

/**
 * @param cleanStatus The new cleaning status.
 */
const setCleanStatus = (cleanStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ cleanStatus });
  };
};

/**
 * @param selectedExam The new exams.
 */
const setSelectedExam = (selectedExam: Exam) => {
  return ({ setState }) => {
    setState({ selectedExam });
  };
};

/**
 * Trigger conversion to PDF via the {@link PdfService} and set {@link IExamsState.taskPdf} accordingly.
 * Also automatically triggers download of the resulting PDF.
 */
const convertToPdf = () => {
  return async ({ dispatch }) => {
    // get pdf
    try {
      const pdfBase64: string = await PdfService.getDocument();
      dispatch(setTaskPdf(pdfBase64));
      dispatch(setConversionStatus(RequestStatus.SUCCESS));

      // download PDF
      downloadFileBase64("application/pdf", "exam.pdf", pdfBase64);
    } catch (e) {
      console.warn("PDF conversion failed with reason:", e);
      dispatch(setConversionStatus(RequestStatus.ERROR));
    }
  };
};

/**
 * Trigger build via the {@link ExamsRepository} and set {@link IExamsState.build} accordingly.
 * Also automatically triggers download of the received PDF documents.
 */
const build = () => {
  return async ({ getState, dispatch }) => {
    dispatch(setBuildStatus(RequestStatus.WAITING));
    try {
      // Be cautious if state changes during method execution
      const currentSelection = getState().selectedExam;
      const build = await ExamsRepository.getBuild(currentSelection.id);
      dispatch(setBuild(build));
      dispatch(setBuildStatus(RequestStatus.SUCCESS));

      // download build PDF
      downloadFileBase64(
        "application/pdf",
        `${currentSelection.title}-${currentSelection.topic}-build.pdf`,
        build.pdfFile
      );
      // download QR code stickers
      downloadFileBase64(
        "application/pdf",
        `${currentSelection.title}-${currentSelection.topic}-QR-Code.pdf`,
        build.qrCodePdfFile
      );

      // Reload exams to get most recent state
      await dispatch(loadExams());
    } catch (e) {
      console.warn("Build failed with reason:", e);
      dispatch(setBuildStatus(RequestStatus.ERROR));
    }
  };
};

/**
 * Trigger taskPdf upload via the {@link ExamsRepository}.
 */
const exportTaskPdf = (taskList: ITaskList) => {
  return async ({ getState, dispatch }) => {
    dispatch(setExportStatus(RequestStatus.WAITING));

    try {
      // If the exam has been built already (is SubmissionReady), we have to clean it first
      if (getState().selectedExam.status === ExamStatus.SubmissionReady) {
        console.debug("Cleaning exam before rebuild...");
        await dispatch(clean());
      }

      await ExamsRepository.setTaskPdf(getState().selectedExam.id, getState().taskPdf, taskList);
      dispatch(setExportStatus(RequestStatus.SUCCESS));

      // Reload exams to get most recent state
      await dispatch(loadExams());
    } catch (e) {
      console.warn("Export failed with reason", e);
      dispatch(setExportStatus(RequestStatus.ERROR));
    }
  };
};

/**
 * Get exams from the {@link ExamsRepository}.
 */
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

/**
 * Clean the {@link IExamsState.selectedExam} via the {@link ExamsRepository}.
 */
const clean = () => {
  return async ({ getState, dispatch }) => {
    dispatch(setCleanStatus(RequestStatus.WAITING));
    try {
      await ExamsRepository.clean(getState().selectedExam.id);
      dispatch(setCleanStatus(RequestStatus.SUCCESS));

      // Do not need to reload exams as clean is never called explicitly
    } catch (e) {
      console.warn("Cleaning failed with reason:", e);
      dispatch(setCleanStatus(RequestStatus.ERROR));
    }
  };
};

/**
 * Force a rerender by updating the state by-reference without touching actual values.
 */
const forceRerender = () => {
  return ({ getState, dispatch }) => {
    dispatch(setExams([].concat(getState().exams)));
  };
};

// STORE INITIALIZATION
/**
 * The exams MicroStore.
 */
export const examsStore = createStore({
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
  // PUBLIC ACTIONS
  actions: {
    setSelectedExam,
    setConversionStatus,
    setExportStatus,
    setBuildStatus,
    setExamsStatus,
    loadExams,
    convertToPdf,
    build,
    exportTaskPdf,
    forceRerender,
    clean,
  },
  name: "exams-store",
});

// HOOK EXPORT
/**
 * Custom React Hook that grants access to the exams MicroStore.
 * In particular, exposes the {@link IExamsState} and exams-related actions.
 */
const useExams = createHook(examsStore);
export default useExams;

// SELECTORS
