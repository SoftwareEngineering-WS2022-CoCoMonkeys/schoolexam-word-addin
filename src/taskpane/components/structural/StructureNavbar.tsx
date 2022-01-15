import * as React from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import "./StructureNavbar.scss";
import DocumentTitlePage from "./DocumentTitlePage";

export default function StructureNavbar(_props: unknown): JSX.Element {
  return (
    <div id="structure-navbar">
      <Pivot aria-label="StructureNavigationBar">
        <PivotItem headerText="Fußzeile">
          <PageFooter />
        </PivotItem>
        <PivotItem headerText="Titelseite">
          <DocumentTitlePage />
        </PivotItem>
        <PivotItem headerText="Kopfzeile">
          <PageHeader />
        </PivotItem>
      </Pivot>
    </div>
  );
}
