import * as React from "react";
import Progress from "./Progress";
import TaskView from "./task/TaskView";
import Header from "./Header";
import './App.scss'

/* global Word, require */

export interface AppProps {
    title: string;
    isOfficeInitialized: boolean;
}

export interface AppState {
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            listItems: [],
        };
    }

    render() {
        const {title, isOfficeInitialized} = this.props;

        if (!isOfficeInitialized) {
            return (
                <Progress
                    title={title}
                    logo={require("./../../../assets/logo-filled.png")}
                    message="Please sideload your addin to see app body."
                />
            );
        }

        return (
            <div id="app-main">
                <Header></Header>
                <TaskView></TaskView>
            </div>
        );
    }
}
