import * as React from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import DocumentTitlePage from "./DocumentTitlePage";

/**
 * React component organizes the components associated with document structure (header, front page, footer).
 * @component
 */
export default function StructureNavbar(): JSX.Element {
  return (
    <Pivot
      className="pivot"
      aria-label="StructureNavigationBar"
      styles={{ root: { display: "flex", justifyContent: "center" } }}
    >
      <PivotItem className="pivot-margin stretch" headerText="Fußzeile">
        <PageFooter />
      </PivotItem>
      <PivotItem className="pivot-margin stretch" headerText="Titelseite">
        <DocumentTitlePage />
      </PivotItem>
      <PivotItem className="pivot-margin stretch" headerText="Kopfzeile">
        <PageHeader />
      </PivotItem>
    </Pivot>
  );
}
