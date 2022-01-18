import { createHook, createStore } from "react-sweet-state";
import TaskList from "../../../word/TaskList";
import Task from "../../../word/Task";
import IDocumentState from "./IDocumentState";
import QrCode from "../../../word/QrCode";

// ACTIONS
const setTaskList = (taskList: TaskList) => {
  return async ({ setState }) => {
    setState({
      taskList,
    });
  };
};

const setQrCode = (qrCode: QrCode) => {
  return async ({ setState }) => {
    setState({
      qrCode,
    });
  };
};

const load = () => {
  return async ({ getState, dispatch }) => {
    dispatch(setTaskList(await getState().taskList.load()));
    dispatch(setQrCode(await getState().qrCode.load()));
  };
};

const addTask = (maxPoints: number) => {
  return async ({ getState, dispatch }) => {
    dispatch(setTaskList(await getState().taskList.addTaskFromSelectionAsync(maxPoints)));
  };
};

const editTask = (taskId: string, fieldName: string, newValue: string | number) => {
  return async ({ getState, dispatch }) => {
    dispatch(setTaskList(await getState().taskList.editTaskAsync(taskId, fieldName, newValue)));
  };
};

const deleteTask = (taskToDelete: Task) => {
  return async ({ getState, dispatch }) => {
    dispatch(setTaskList(await getState().taskList.deleteTaskAsync(taskToDelete)));
  };
};

const updateTaskTitles = () => {
  return async ({ getState, dispatch }) => {
    dispatch(setTaskList(await getState().taskList.updateTaskTitlesAsync()));
  };
};

const setFooterQrCodeCcId = (footerCcId: number) => {
  return async ({ getState, dispatch }) => {
    dispatch(await getState().qrCode.setFooterCcIdAndCopy(footerCcId));
  };
};

const setTitleQrCodeCcId = (titleCcId: number) => {
  return async ({ getState, dispatch }) => {
    dispatch(await getState().qrCode.setTitleCcIdAndCopy(titleCcId));
  };
};

// STORE INITIALIZATION
const documentStore = createStore({
  initialState: <IDocumentState>{
    taskList: new TaskList(),
    qrCode: new QrCode(),
  },
  // PUBLIC ACTIONS
  actions: {
    load,
    addTask,
    editTask,
    deleteTask,
    updateTaskTitles,
    setFooterQrCodeCcId,
    setTitleQrCodeCcId,
  },
  name: "document-store",
});

const useDocument = createHook(documentStore);
export default useDocument;

// SELECTORS
const tasks = (state) => state.taskList;
export const useTasks = createHook(documentStore, {
  selector: tasks,
});

const qrCode = (state) => state.qrCode;
export const useQrCode = createHook(documentStore, {
  selector: qrCode,
});
