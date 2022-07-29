import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Col, Button } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";

import { connect } from "react-redux";
import {
  fetchEvents,
  addRule,
  deleteEvents,
} from "../../../redux/actions/rules/index";
import QueryBuilder from "../../dashboard/querybuilder_2";
// REDUX

function RuleThirdStep(props) {
  const {
    stepper,
    setWizardOpen,
    setRuleThirdStep,
    eventsArray,
    id,
    name,
    description,
    assignedEvent,
    assignedCategory,
    resetId,
    resetName,
    resetDescription,
    resetCategory,
    resetEvent,
    resetInfo,
  } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <Fragment>
      <QueryBuilder
        stepper={stepper}
        setRuleThirdStep={setRuleThirdStep}
        eventsArray={eventsArray}
        id={id}
        name={name}
        description={description}
        assignedEvent={assignedEvent}
        assignedCategory={assignedCategory}
        resetId={resetId}
        resetName={resetName}
        resetDescription={resetDescription}
        resetCategory={resetCategory}
        resetEvent={resetEvent}
        resetInfo={resetInfo}
      />

      <div className="d-flex justify-content-between">
        <Col xs="4">
          <Button
            color="secondary"
            className="btn-prev px-md-3"
            outline
            onClick={() => {
              stepper.previous();
            }}
          >
            <ArrowLeft
              size={14}
              className="align-middle mr-sm-17 mr-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
        </Col>
        <Col xs="8" style={{ textAlign: "end" }}>
          <Button
            color="secondary"
            className="btn mr-1"
            outline
            onClick={() => {
              reset({}), setWizardOpen(false);
            }}
          >
            <span className="align-middle d-sm-inline-block d-none">
              Cancel
            </span>
          </Button>
          <Button
            color="primary"
            className="btn-next px-md-3"
            type="submit"
            onClick={() => {
              stepper.next();
            }}
          >
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight
              size={14}
              className="align-middle ml-sm-25 ml-0"
            ></ArrowRight>
          </Button>
        </Col>
      </div>
    </Fragment>
  );
}

RuleThirdStep.propTypes = {
  stepper: PropTypes.object,
  type: PropTypes.string,
  setRuleSecondStep: PropTypes.func,
  resetEvent: PropTypes.object,
  resetCategory: PropTypes.string,
  eventList: PropTypes.array,
  addRule: PropTypes.func,
  eventsArray: PropTypes.array,
  rulesCategory: PropTypes.array,
  setWizardOpen: PropTypes.func,
  setRuleThirdStep: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  assignedEvent: PropTypes.string,
  assignedCategory: PropTypes.string,
  resetId: PropTypes.string,
  resetName: PropTypes.string,
  resetDescription: PropTypes.string,
  resetInfo: PropTypes.object,
};

const mapStateToProps = (state) => {
  return { eventList: state.fields };
};

export default connect(mapStateToProps, { addRule })(RuleThirdStep);
