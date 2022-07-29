import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Utils as QbUtils } from "react-awesome-query-builder";
import { Label, FormGroup, Row, Col, Input, Form, Button } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";

import { connect } from "react-redux";
import {
  fetchEvents,
  addRule,
  deleteEvents,
} from "../../../redux/actions/rules/index";
// REDUX

function RuleFirstStep(props) {
  const {
    stepper,
    type,
    setRuleFirstStep,
    addRule,
    setWizardOpen,
    wizardOpen,
    resetName,
    resetDescription,
    resetInfo,
  } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    setRuleFirstStep(data.name, data.description);
    reset();
  };

  useEffect(() => {
    if (resetName !== "" && resetDescription !== "") {
      reset({ name: resetName, description: resetDescription });
    }
  }, [resetName, resetDescription]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="d-flex align-between">
          <Col md="6">
            <h5> Rule Name</h5>
            <input
              type="text"
              className="form-control mb-1"
              name={`name`}
              id={`name-${type}`}
              placeholder="Enter Your Rule Name"
              ref={register({})}
            />
          </Col>
        </Row>
        <Row className="d-flex align-between">
          <Col md="6">
            <h5> Rule Description</h5>
            <input
              type="text"
              className="form-control"
              name={`description`}
              id={`description-${type}`}
              placeholder="Enter Your Rule Description"
              ref={register({})}
            />
          </Col>
        </Row>
        <hr />
        <div className="d-flex justify-content-end">
          <Col xs="4" style={{ textAlign: "End" }}>
            <Button.Ripple
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
            </Button.Ripple>
            <Button
              color="primary"
              className="btn-next px-md-3"
              type="submit"
              onClick={(e) => {
                stepper.next();
              }}
            >
              <span className="align-middle d-sm-inline-block d-none">
                Next
              </span>
              <ArrowRight
                size={14}
                className="align-middle ml-sm-25 ml-0"
              ></ArrowRight>
            </Button>
          </Col>
        </div>
      </Form>
    </Fragment>
  );
}

RuleFirstStep.propTypes = {
  stepper: PropTypes.object,
  type: PropTypes.string,
  setRuleFirstStep: PropTypes.func,
  resetName: PropTypes.string,
  resetDescription: PropTypes.string,
  eventList: PropTypes.array,
  addRule: PropTypes.func,
  resetInfo: PropTypes.object,
};

const mapStateToProps = (state) => {
  return { eventList: state.fields };
};

export default connect(mapStateToProps, { addRule })(RuleFirstStep);
