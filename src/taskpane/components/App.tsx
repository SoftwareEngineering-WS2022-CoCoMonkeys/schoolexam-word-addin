import * as React from "react";
import { useEffect } from "react";
import "./App.scss";
import Navbar from "./taskpaneDesign/Navbar";
import LoginView from "./login/LoginView";
import Header from "./taskpaneDesign/Header";
import useAuth from "../../store/AuthenticationStore";
import useDocument from "../../store/DocumentStore";
import { Spinner, SpinnerSize, Stack } from "@fluentui/react";

/**
 * Properties of {@link App}
 */
export interface AppProps {
  /** Whether Office has been initialized */
  isOfficeInitialized: boolean;
}

/**
 * Entrypoint to the App.
 * @component
 */
export default function App(props: AppProps): JSX.Element {
  const [, documentActions] = useDocument();
  const [authState] = useAuth();

  // Load data persisted in word (tasks, QR-Code)
  useEffect(() => {
    documentActions.load();
  }, []);

  // Display loading animation until Office is ready
  if (!props.isOfficeInitialized) {
    return <Spinner size={SpinnerSize.large} />;
  }

  const mainContent = authState.displayLogin ? <LoginView /> : <Navbar />;

  return (
    <Stack horizontal={false} verticalAlign="center" horizontalAlign="center" tokens={{ childrenGap: 20 }}>
      <Header />
      {mainContent}
    </Stack>
  );
}
