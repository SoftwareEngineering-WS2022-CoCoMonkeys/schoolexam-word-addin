// @ts-ignore
import * as React from "react";
// eslint-disable-next-line no-unused-vars
import { Icon, IStyleSet, Label, ILabelStyles, Pivot, IPivotItemProps, PivotItem } from "@fluentui/react";
import TaskView from "../task/TaskView";
import DocumentTitlePage from "../structural/DocumentTitlePage";
import PageHeader from "../structural/PageHeader";
import PageFooter from "../structural/PageFooter";
import { Stack } from "@fluentui/react";
import ExportButton from "../export/exportButton";

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const Navbar: React.FunctionComponent = () => {
  return (
    <div>
      <Pivot aria-label="NavigationBar">
        <PivotItem headerText="Aufgaben" itemCount={42} itemIcon="Dictionary">
          <Label styles={labelStyles}>
            <TaskView></TaskView>
          </Label>
        </PivotItem>
        <PivotItem headerText="Struktur" itemIcon="BulletedTreeList">
          <Label styles={labelStyles}>
            <Stack horizontal>
              <DocumentTitlePage></DocumentTitlePage>
              <PageHeader></PageHeader>
              <PageFooter></PageFooter>
            </Stack>
          </Label>
        </PivotItem>
        <PivotItem headerText="Einstellungen" itemIcon="Settings">
          <Label styles={labelStyles}>TODO</Label>
        </PivotItem>
        <PivotItem headerText="Exportieren" itemIcon="Share">
          <Label styles={labelStyles}>
            <ExportButton></ExportButton>
          </Label>
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
