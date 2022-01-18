import * as React from "react";
import { useEffect } from "react";
import Progress from "./Progress";
import "./App.scss";
import Navbar from "./taskpaneDesign/Navbar";
import LoginView from "./login/LoginView";
import Header from "./taskpaneDesign/Header";
import useAuth from "./state/AuthenticationStore";
import useDocument from "./state/DocumentStore";
import { v4 as uuidv4 } from "uuid";
import { Stack } from "@fluentui/react";

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
    for (let i = 0; i < 10; i++) {
      console.log(uuidv4());
    }
    documentActions.load();
  }, []);

  const mainContent = authState.displayLogin ? <LoginView /> : <Navbar />;

  return (
    <Stack horizontal={false} verticalAlign="center" horizontalAlign="center" tokens={{ childrenGap: 20 }}>
      <Header />
      {mainContent}
    </Stack>
  );
}
