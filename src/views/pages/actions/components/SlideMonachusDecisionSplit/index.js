import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchRule } from "../../../../../redux/actions/rules";
import { Row, Col, Label, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { useSkin } from "@hooks/useSkin";
import { updateJourney } from "../../../../../redux/actions/journey";
export const SlideMonachusDecisionSplit = ({
  rulesData = [],
  selectedBlockType = "",
  selectedBlockId = "",
  fetchRule = () => {},
  updateJourney = () => {},
  graphNodes = [],
  journeyOptions = {},
}) => {
  const [currentRulesData, setCurrentRulesData] = useState([]);
  const [skin, setSkin] = useSkin();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    // console.log("rulesData", rulesData);
    const currentRules = rulesData?.data;
    const currentRuleNames = currentRules?.map((rule) => {
      return {
        id: rule.id,
        name: rule.name,
        category: rule.category,
      };
    });
    // console.log("currentRuleNames", currentRuleNames);
    setCurrentRulesData(currentRuleNames);
  }, [rulesData]);
  useEffect(() => {
    fetchRule();
  }, []);
  const onSubmit = (data) => {
    // console.log("data", data);
    // find the node with the id of the selected block
    const targetNode = graphNodes.find((node) => {
      return node.id === selectedBlockId;
    });
    // add config property to targetNode
    targetNode.config = {
      ruleId: data.journeyRuleSelect,
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
      <Col xs={12} md={12} className="mb-5 mt-2">
        <Label className="form-label" for="journeyRuleSelect">
          Rule Integration
        </Label>
        <select
          name="journeyRuleSelect"
          ref={register({ required: true })}
          className="form-control textCustomClass mb-1"
        >
          <>
            {currentRulesData?.map((rule) => (
              <option key={rule.id} value={rule.id}>
                {rule.category}-{rule.name}
              </option>
            ))}
          </>
        </select>
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
  SlideMonachusDecisionSplit
);
