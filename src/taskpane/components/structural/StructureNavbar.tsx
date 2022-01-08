import * as React from "react";
import { Icon, IStyleSet, Label, ILabelStyles, Pivot, IPivotItemProps, PivotItem } from "@fluentui/react";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import "./StructureNavbar.scss";
import DocumentTitlePage from "./DocumentTitlePage";

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
};
export const StructureNavbar: React.FunctionComponent = () => (
  <div>
    <Pivot aria-label="StructureNavigationBar">
      <PivotItem headerText="Fußzeile (Benötigt)">
        <PageFooter />
      </PivotItem>
      <PivotItem headerText="Titelseite (Benötigt)">
        <DocumentTitlePage />
      </PivotItem>
      <PivotItem headerText="Kopfzeile">
        <PageHeader />
      </PivotItem>
    </Pivot>
  </div>
);
