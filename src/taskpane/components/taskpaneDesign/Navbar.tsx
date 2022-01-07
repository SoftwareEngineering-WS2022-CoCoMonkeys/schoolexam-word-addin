import * as React from "react";
import { Pivot, PivotItem, Stack } from "@fluentui/react";
import TaskView from "../task/TaskView";
import ExportView from "../export/ExportView";
import "./Navbar.scss";
import { StructureNavbar } from "../structural/StructureNavbar";

export default function Navbar(props) {
  return (
    <div>
      <Pivot aria-label="NavigationBar">
        <PivotItem className="pivot-item" headerText="Aufgaben" itemCount={42} itemIcon="Dictionary">
          <TaskView />
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Struktur" itemIcon="BulletedTreeList">
          <Stack horizontal>
            <StructureNavbar />
          </Stack>
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Extras" itemIcon="Star">
          //TODO
        </PivotItem>
        <PivotItem className="pivot-item" headerText="Exportieren" itemIcon="Share">
          <ExportView></ExportView>
        </PivotItem>
      </Pivot>
    </div>
  );
}
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
