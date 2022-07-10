import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Label, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { useSkin } from "@hooks/useSkin";
import { updateJourney } from "../../../../../redux/actions/journey";
export const SlideMonachusWaitDuration = ({
  selectedBlockType = "",
  selectedBlockId = "",
  updateJourney = () => {},
  graphNodes = [],
  journeyOptions = {},
}) => {
  const [skin, setSkin] = useSkin();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log("data", data);
    // find the node with the id of the selected block
    const targetNode = graphNodes.find((node) => {
      return node.id === selectedBlockId;
    });
    // add config property to targetNode
    targetNode.config = {
      duration: data.journeyWaitDurationLength,
      durationUnit: data.journeyWaitDurationType,
    };
    // console.log("targetNode", targetNode);
    updateJourney(targetNode, graphNodes);
  };
  return (
    <Row
      tag="form"
      className="gy-1 gx-2 m-0"
      id="calendarPage"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Col xs={12} md={12} className="mb-5 mt-2">
        <Label className="form-label" for="journeyWaitDuration">
          Wait for Duration
        </Label>
        <Row className="d-flex justify-content-center">
          <input
            type="number"
            name="journeyWaitDurationLength"
            id="journeyWaitDurationLength"
            className="form-control w-25 mr-1"
            placeholder="Wait Duration"
            ref={register({ required: true })}
          />{" "}
          <select
            name="journeyWaitDurationType"
            id="journeyWaitDurationType"
            className="form-control w-25"
            ref={register({ required: true })}
          >
            <option value="" hidden>
              Select Duration
            </option>
            <option value="Seconds">Seconds</option>
            <option value="Minutes">Minutes</option>
            <option value="Hours">Hours</option>
          </select>
        </Row>
      </Col>
      <Col
        xs={12}
        md={12}
        className="
        d-flex justify-content-center
      "
      >
        <Button color="primary" type="submit" className="mt-5">
          Submit
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { updateJourney })(
  SlideMonachusWaitDuration
);
