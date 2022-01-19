import { DirectionalHint, Icon, Stack, TooltipHost } from "@fluentui/react";
import * as React from "react";
import { useId } from "@fluentui/react-hooks";
import { v4 as uuidv4 } from "uuid";

/**
 * An condition and its current fulfillment status.
 */
export class CheckListItem {
  /** If the condition is currently fulfilled */
  status: boolean;
  /** A description of the condition */
  condition: string;

  constructor(status: boolean, condition: string) {
    this.status = status;
    this.condition = condition;
  }
}

/**
 * Properties for {@link TooltipCheckList}
 */
interface CheckListProps {
  /** The child component to render */
  renderChild: JSX.Element;
  /** The items to display as a checklist in the tooltip */
  items: CheckListItem[];
}

/**
 * React component that wraps a potentially disabled component.
 * On hover, a {@link TooltipHost} with the list of conditions to unlock this button (and their current status) is
 * displayed, unless all conditions are fulfilled.
 * @param props The child component to wrap and the list of conditions.
 * @component
 */
export default function TooltipCheckList(props: CheckListProps): JSX.Element {
  const tooltipId = useId(uuidv4());

  function activityIconFromStatus(index: number, item: CheckListItem) {
    return (
      <Stack key={index} horizontal={true} verticalAlign="center" tokens={{ childrenGap: 5 }}>
        {item.status ? (
          <Icon iconName={"CheckMark"} styles={{ root: { color: "green" } }} />
        ) : (
          <Icon iconName={"Cancel"} styles={{ root: { color: "red" } }} />
        )}
        <span>{item.condition}</span>
      </Stack>
    );
  }

  /** Whether all conditions are true. If so, the checklist is not shown */
  const allTrue = props.items.map((item) => item.status).reduce((a, b) => a && b);

  /** The component to display within the tooltip */
  const tooltipComponent = (
    <Stack horizontal={false} tokens={{ childrenGap: 4 }}>
      {props.items.map((item, index) => activityIconFromStatus(index, item))}
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
