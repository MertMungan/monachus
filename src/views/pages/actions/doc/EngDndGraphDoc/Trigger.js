import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import EngIcon from "../../components/EngIcon";
import { ICON_TYPES } from "../../components/Constants";
import { useSkin } from "@hooks/useSkin";
const TriggerContainer = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 16px;
  border: 1px solid #b3bac5;
  background-color: #ed2419;
  text-align: center;
  padding: 16px 8px;

  .ant-btn {
    line-height: 1.5715;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    padding: 4px 15px;
    border-radius: 2px;
    color: #fff;
    background: #ed2419;
    border: 1px solid #b3bac5;
    :hover {
      background: #ed2419;
    }
  }
`;

const Trigger = (props) => {
  const { width, height, className, showButton, buttonProps, triggerContent } =
    props;

  return (
    <TriggerContainer width={width} height={height} className={className}>
      {showButton && (
        <Button>
          <EngIcon type={ICON_TYPES.SETTING} />
          {buttonProps.title}
        </Button>
      )}
      {triggerContent}
    </TriggerContainer>
  );
};

Trigger.defaultProps = {
  showButton: true,
  buttonProps: {
    title: "  Start",
  },
  width: "148px",
  height: "180px",
  triggerContent: null,
};

export default Trigger;
