// @ts-ignore
import * as React from "react";
// eslint-disable-next-line no-unused-vars
import { ILabelStyles, IStyleSet, Pivot, PivotItem, Stack } from "@fluentui/react";
import TaskView from "../task/TaskView";
import DocumentTitlePage from "../structural/DocumentTitlePage";
import PageHeader from "../structural/PageHeader";
import PageFooter from "../structural/PageFooter";
import ExportButton from "../export/exportButton";
import "./Navbar.scss";

export const Navbar: React.FunctionComponent = () => {
  return (
    <div>
      <Pivot aria-label="NavigationBar">
        <PivotItem className="pivot-item" headerText="Aufgaben" itemCount={42} itemIcon="Dictionary">
          <TaskView />
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Struktur" itemIcon="BulletedTreeList">
          <Stack horizontal>
            <DocumentTitlePage />
            <PageHeader />
            <PageFooter />
          </Stack>
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Einstellungen" itemIcon="Settings">
          //TODO
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Exportieren" itemIcon="Share">
          <ExportButton></ExportButton>
        </PivotItem>
      </Pivot>
    </div>
  );
};
// </Pivot>onRenderItemLink={_customRenderer}>
/*
 function _customRenderer(
 link?: IPivotItemProps,
 defaultRenderer?: (link?: IPivotItemProps) => JSX.Element | null
 ): JSX.Element | null {
 if (!link || !defaultRenderer) {
 return null;
 }

 return (
 <span style={{ flex: "0 1 100%" }}>
 {defaultRenderer({ ...link, itemIcon: undefined })}
 <Icon iconName={link.itemIcon} style={{ color: "red" }} />
 </span>
 );
 }*/
