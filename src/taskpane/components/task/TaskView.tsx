import * as React from "react";
import TaskTable from "./TaskTable";
import TaskList from "../../../model/TaskList";
import NewTaskForm from "./NewTaskForm";
import './TaskView.scss'

export interface TaskViewProps {

}

export interface TaskViewState {
    taskList: TaskList;
}

export default class TaskView
    extends React.Component<TaskViewProps, TaskViewState> {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            taskList: new TaskList()
        }
    }

    componentDidMount() {
        this.state.taskList.load().then(taskList => {
            this.setState({taskList: taskList})
        })
    }

    private addTaskFromSelection = (maxPoints: number) => {
        this.state.taskList.addTaskFromSelection(maxPoints, (taskList) => this.setState({taskList: taskList}));
    }

    render() {
        return (
            <div id="task-view">
                <TaskTable taskList={this.state.taskList}/>
                <NewTaskForm addTask={this.addTaskFromSelection}></NewTaskForm>
            </div>)
    }
}