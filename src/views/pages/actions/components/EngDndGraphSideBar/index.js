import React from "react";
import SidebarNodesRendered from "./SidebarNodesRendered";
import { Row } from "antd";
import "./index.scss";
import { Label, LabelInline } from "../Label";
import { COLORS } from "../Constants/StyleVar";
import { useSkin } from "@hooks/useSkin";
export const EngDndGraphSidebar = (props) => {
  const {
    nodes = [],
    sidebarTitle,
    sidebarDescription,
    isNodeDraggable,
    endDrag,
  } = props;

  const [skin, setSkin] = useSkin();

  return (
    <Row className="dnd-graph-sidebar-container">
      {sidebarTitle && (
        <Row className="align-items-center">
          <Label
            fontSize="16px"
            fontWeight="500"
            color={skin === "dark" ? "#d0d2d6" : "black"}
          >
            {sidebarTitle}
          </Label>
        </Row>
      )}
      {sidebarDescription && (
        <Label
          fontSize="12px"
          color={skin === "dark" ? COLORS.LIGHT_GREY : "black"}
        >
          {sidebarDescription}
        </Label>
      )}
      <SidebarNodesRendered
        nodes={nodes}
        isNodeDraggable={isNodeDraggable}
        endDrag={endDrag}
      />
    </Row>
  );
};

export default EngDndGraphSidebar;
