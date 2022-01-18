import { DirectionalHint, Icon, Stack, TooltipHost } from "@fluentui/react";
import * as React from "react";
import { useId } from "@fluentui/react-hooks";
import { v4 as uuidv4 } from "uuid";

export class CheckListItem {
  condition: boolean;
  activity: string;

  constructor(condition: boolean, activity: string) {
    this.condition = condition;
    this.activity = activity;
  }
}

interface CheckListProps {
  renderChild: JSX.Element;
  items: CheckListItem[];
}

export default function TooltipCheckList(props: CheckListProps): JSX.Element {
  const tooltipId = useId(uuidv4());

  function activityIconFromStatus(item: CheckListItem) {
    return (
      <Stack horizontal={true} verticalAlign="center" tokens={{ childrenGap: 5 }}>
        {item.condition ? (
          <Icon iconName={"CheckMark"} styles={{ root: { color: "green" } }} />
        ) : (
          <Icon iconName={"Cancel"} styles={{ root: { color: "red" } }} />
        )}
        <span>{item.activity}</span>
      </Stack>
    );
  }

  const allTrue = props.items.map((item) => item.condition).reduce((a, b) => a && b);

  const tooltipComponent = (
    <Stack horizontal={false} tokens={{ childrenGap: 4 }}>
      {props.items.map((item) => activityIconFromStatus(item))}
    </Stack>
  );
  return (
    <TooltipHost
      hidden={allTrue}
      tooltipProps={{ onRenderContent: () => tooltipComponent }}
      id={tooltipId}
      directionalHint={DirectionalHint.bottomCenter}
    >
      {props.renderChild}
    </TooltipHost>
  );
}
