import { createHook, createStore } from "react-sweet-state";
import ISubmissionsState from "./ISubmissionsState";
import RequestStatus from "./RequestStatus";
import SubmissionsRepository from "../services/OnlineSubmissionsRepository";
import { uploadFileBase64 } from "../services/DownloadService";
import Submission from "../../../model/Submission";

const setSubmissions = (submissions: Submission[]) => {
  return ({ setState }) => {
    setState({ submissions });
  };
};

const setUploadSubmissionsStatus = (uploadSubmissionsStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ uploadSubmissionsStatus });
  };
};

const setAddSubmissionsStatus = (addSubmissionsStatus: RequestStatus) => {
  return ({ setState }) => {
    setState({ addSubmissionsStatus });
  };
};

const addSubmissions = (examId: string) => {
  return ({ getState, dispatch }) => {
    dispatch(setAddSubmissionsStatus(RequestStatus.WAITING));
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

const submissionsStore = createStore({
  initialState: <ISubmissionsState>{
    submissions: [],
    uploadSubmissionsStatus: RequestStatus.IDLE,
    addSubmissionsStatus: RequestStatus.IDLE,
  },
  actions: {
    // PUBLIC ACTIONS
    addSubmissions,
    uploadSubmissions,
  },
  // optional, mostly used for easy debugging
  name: "submissions-store",
});

const useSubmissions = createHook(submissionsStore);
export default useSubmissions;
