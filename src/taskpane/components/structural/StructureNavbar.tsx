import * as React from "react";
import { Icon, IStyleSet, Label, ILabelStyles, Pivot, IPivotItemProps, PivotItem } from "@fluentui/react";
import DocumentTitlePage from "./DocumentTitlePage";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};
export const StructureNavbar: React.FunctionComponent = () => (
  <div>
    <Pivot aria-label="StructureNavigationBar">
      <PivotItem headerText="Fußzeile (Benötigt)">
        <PageFooter></PageFooter>
      </PivotItem>
      <PivotItem headerText="Titelseite (Benötigt)">
        <DocumentTitlePage></DocumentTitlePage>
      </PivotItem>
      <PivotItem headerText="Kopfzeile">
        <PageHeader></PageHeader>
      </PivotItem>
    </Pivot>
  </div>
);
