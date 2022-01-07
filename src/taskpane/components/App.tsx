// @ts-ignore
import * as React from "react";
import Progress from "./Progress";
import Header from "./taskpaneDesign/Header";
import "./App.scss";

import { Navbar } from "./taskpaneDesign/Navbar";
import LoginForm from "./login/LoginForm";

/* global Word, require */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  displayLogin: boolean;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      displayLogin: false,
    };
  }

  private readonly onLoginClick = () => {
    this.setState((prevState) => ({
      displayLogin: !prevState.displayLogin,
    }));
    console.log(this.state.displayLogin);
  };

  render() {
    const { title, isOfficeInitialized } = this.props;

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
        <Header
          onExpandLogin={() => this.setState({ displayLogin: true })}
          onCollapseLogin={() => this.setState({ displayLogin: false })}
          loginPageDisplayed={this.state.displayLogin}
        />
        {this.state.displayLogin ? <LoginForm /> : <Navbar />}
      </div>
    );
  }
}
