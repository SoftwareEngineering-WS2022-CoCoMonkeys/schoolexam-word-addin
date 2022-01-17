import { createHook, createStore } from "react-sweet-state";
import ISubmissionsState from "./ISubmissionsState";

const submissionsStore = createStore({
  initialState: <ISubmissionsState>{
    submissions: [],
  },
  actions: {
    addAll(newSubmissions: string[]) {
      return ({ setState, getState }) => {
        setState({
          submissions: getState().submissions.concat(newSubmissions),
        });
      };
    },
    dropFirst() {
      return ({ setState, getState }) => {
        setState({
          submissions: getState().submissions.slice(1),
        });
      };
    },
  },
  // optional, mostly used for easy debugging
  name: "submissions-list",
});

const useSubmissions = createHook(submissionsStore);
export default useSubmissions;
