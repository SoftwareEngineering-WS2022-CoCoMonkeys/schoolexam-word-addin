import ITask from "./ITask";

export default interface ITaskList {
  get tasks(): ITask[];
}
