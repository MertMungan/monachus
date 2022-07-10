import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchRule } from "../../../../../redux/actions/rules";
import { Row, Col, Label, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { useSkin } from "@hooks/useSkin";
import { updateJourney } from "../../../../../redux/actions/journey";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
export const SlideMonachusWaitDate = ({
  selectedBlockType = "",
  selectedBlockId = "",
  updateJourney = () => {},
  graphNodes = [],
  journeyOptions = {},
}) => {
  const [skin, setSkin] = useSkin();
  const [date, setDate] = useState(new Date());
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getDate = (date) => {
    setDate(date);
  };
  const onSubmit = (data) => {
    // console.log("data", data);
    // find the node with the id of the selected block
    const targetNode = graphNodes.find((node) => {
      return node.id === selectedBlockId;
    });
    // add config property to targetNode
    targetNode.config = {
      date: date,
    };
    // console.log("targetNode", targetNode);
    updateJourney(targetNode, graphNodes);
  };
  return (
    <Row
      tag="form"
      className="gy-1 gx-2 m-0"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        backgroundColor: skin === "dark" ? "#161d31" : "#f8f8f8",
      }}
    >
      <Col
        xs={12}
        md={12}
        className="mt-2 d-flex justify-content-center"
      >
        <Calendar
          onChange={getDate}
          value={date}
          ref={register({ required: true })}
        />
        {/*    <input
          type="date"
          name="journeyWaitDate"
          ref={register({ required: true })}
          className="form-control textCustomClass mb-1"
          min={new Date().toISOString().split("T")[0]}
        /> */}
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

const mapStateToProps = (state) => ({
  rulesData: state.query,
});

export default connect(mapStateToProps, { fetchRule, updateJourney })(
  SlideMonachusWaitDate
);
