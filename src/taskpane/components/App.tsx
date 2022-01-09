import * as React from "react";
import Progress from "./Progress";
import Header from "./taskpaneDesign/Header";
import "./App.scss";
import Navbar from "./taskpaneDesign/Navbar";
import LoginForm from "./login/LoginForm";
import { useState } from "react";

/* global Word, require */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export default function App(props: AppProps) {
  const [displayLogin, setDisplayLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const { title, isOfficeInitialized } = props;

  if (!isOfficeInitialized) {
    return (
      <Progress
        title={title}
        logo={require("../../../assets/logo-filled.png")}
        message="Please sideload your addin to see app body."
      />
    );
  }

  const mainContent = displayLogin ? (
    <LoginForm setLoggedIn={setLoggedIn} setDisplayLogin={setDisplayLogin} />
  ) : (
    <Navbar />
  );

  return (
    <div className="center-items">
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setDisplayLogin={setDisplayLogin}
        displayLogin={displayLogin}
      />
      {mainContent}
    </div>
  );
}
