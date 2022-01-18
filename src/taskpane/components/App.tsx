import * as React from "react";
import { useEffect } from "react";
import Progress from "./Progress";
import "./App.scss";
import Navbar from "./taskpaneDesign/Navbar";
import LoginForm from "./login/LoginForm";
import Header from "./taskpaneDesign/Header";
import useAuth from "./state/AuthenticationStore";
import useDocument from "./state/DocumentStore";

/* global Word, require */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export default function App(props: AppProps): JSX.Element {
  const [documentState, documentActions] = useDocument();
  const [authState] = useAuth();

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

  useEffect(() => {
    documentActions.load();
  }, []);

  const mainContent = authState.displayLogin ? <LoginForm /> : <Navbar />;

  return (
    <div className="center-items column-flex">
      <Header />
      {mainContent}
    </div>
  );
}
