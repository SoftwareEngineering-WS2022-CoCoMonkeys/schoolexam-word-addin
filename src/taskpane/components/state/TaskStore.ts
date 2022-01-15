import { createStore, createSubscriber, createHook } from "react-sweet-state";
import TaskList from "../../../word/TaskList";
import Task from "../../../word/Task";
import ITaskState from "./ITaskState";

const taskStore = createStore({
  // value of the store on initialisation
  initialState: <ITaskState>{
    // Load from Word "storage"
    taskList: new TaskList(),
  },
  // actions that trigger store mutation
  actions: {
    load() {
      return async ({ setState, getState }) => {
        setState({
          taskList: await getState().taskList.load(),
        });
      };
    },
    addTask(maxPoints: number) {
      return async ({ setState, getState }) => {
        setState({
          taskList: await getState().taskList.addTaskFromSelectionAsync(maxPoints),
        });
      };
    },
    editTask(taskId: string, fieldName: string, newValue: string | number) {
      return async ({ setState, getState }) => {
        setState({
          taskList: await getState().taskList.editTaskAsync(taskId, fieldName, newValue),
        });
      };
    },
    deleteTask(taskToDelete: Task) {
      return async ({ setState, getState }) => {
        setState({
          taskList: await getState().taskList.deleteTaskAsync(taskToDelete),
        });
      };
    },
    updateTaskTitles() {
      return async ({ setState, getState }) => {
        setState({
          taskList: await getState().taskList.updateTaskTitlesAsync(),
        });
      };
    },
  },
  // optional, mostly used for easy debugging
  name: "taskList",
});

const useTasks = createHook(taskStore);
export default useTasks;
