import { createHook, createStore } from "react-sweet-state";
import ISubmissionsState from "./ISubmissionsState";
import RequestStatus from "./RequestStatus";
import SubmissionsRepository from "../services/OnlineSubmissionsRepository";
import { uploadFileBase64 } from "../services/DownloadService";
import Submission from "../../../model/Submission";

// ACTIONS
/**
 * @param submissions The new submissions.
 */
const setSubmissions = (submissions: Submission[]) => {
  return ({ setState }) => {
    setState({ submissions });
  };
};

/**
 * @param uploadSubmissionsStatus The new submission upload status.
 */
const setUploadSubmissionsStatus = (uploadSubmissionsStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ uploadSubmissionsStatus });
  };
};
/**
 * @param addSubmissionsStatus The new submission addition status.
 */
const setAddSubmissionsStatus = (addSubmissionsStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ addSubmissionsStatus });
  };
};
/**
 * Trigger a file upload that lets the user select multiple files as potential submission candidates and appends the
 * files to {@link ISubmissionsState.submissions}.
 *
 * @param examId The ID of the exam the submissions are for.
 */
const addSubmissions = (examId: string) => {
  return ({ getState, dispatch }) => {
    dispatch(setAddSubmissionsStatus(RequestStatus.WAITING));

    // Open file input window
    uploadFileBase64(
      (filesBase64) => {
        dispatch(setSubmissions(getState().submissions.concat(filesBase64.map((f) => new Submission(f, examId)))));
        dispatch(setAddSubmissionsStatus(RequestStatus.SUCCESS));
      },
      (error) => {
        console.warn("Adding submissions failed with reason:", error);
        dispatch(setAddSubmissionsStatus(RequestStatus.ERROR));
      }
    );
  };
};

/**
 * Upload all {@link ISubmissionsState.submissions} via the {@link SubmissionsRepository}.
 */
const uploadSubmissions = () => {
  return async ({ getState, dispatch }) => {
    dispatch(setUploadSubmissionsStatus(RequestStatus.WAITING));

    try {
      for (const submission of getState().submissions.slice(0)) {
        await SubmissionsRepository.uploadSubmission(submission);
        dispatch(setSubmissions(getState().submissions.slice(1)));
      }

      dispatch(setUploadSubmissionsStatus(RequestStatus.SUCCESS));
    } catch (e) {
      console.warn("Submission upload failed with reason", e);
      dispatch(setUploadSubmissionsStatus(RequestStatus.ERROR));
    }
  };
};

/**
 * The submissions MicroStore
 */
const submissionsStore = createStore({
  initialState: <ISubmissionsState>{
    submissions: [],
    uploadSubmissionsStatus: RequestStatus.IDLE,
    addSubmissionsStatus: RequestStatus.IDLE,
  },
  // PUBLIC ACTIONS
  actions: {
    setUploadSubmissionsStatus,
    setAddSubmissionsStatus,
    addSubmissions,
    uploadSubmissions,
  },
  // optional, mostly used for easy debugging
  name: "submissions-store",
});
// HOOK EXPORT

/**
 * Custom React Hook that grants access to the submissions MicroStore.
 * In particular, exposes the {@link ISubmissionsState} and submissions-related actions.
 */
const useSubmissions = createHook(submissionsStore);
export default useSubmissions;
