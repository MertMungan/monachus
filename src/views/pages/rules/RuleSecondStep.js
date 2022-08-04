import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Label, FormGroup, Row, Col, Input, Form, Button } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";

import { connect } from "react-redux";

// REDUX

function RuleSecondStep(props) {
  const {
    stepper,
    type,
    setRuleSecondStep,
    setWizardOpen,
    resetEvent,
    resetCategory,
    setSelectedEvent,
    setSelectedCategory,
    resetInfo,
    metaCategoryData,
    metaEventData,
  } = props;
  const [categoryList, setCategoryList] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data)
    if (resetInfo.id) {
      setRuleSecondStep(data.eventSelected, data.categorySelected);
    } else {
      setRuleSecondStep(data.eventSelected, data.categorySelected);
    }
    reset();
  };


  useEffect(() => {
    if (metaCategoryData.length > 0) {
      setCategoryList(metaCategoryData);
    }
  }, [metaCategoryData]);

  useEffect(() => {
    if (resetEvent !== "" && resetCategory !== "") {
      reset({
        eventSelected: resetEvent,
        categorySelected: resetCategory,
      });
    }
    setSelectedEvent(resetEvent);
  }, [resetEvent, resetCategory]);


  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="d-flex align-between">
          <Col md="6">
            <h5> Select an event</h5>
            <select
              className="form-control mb-1"
              name="eventSelected"
              id={`eventSelected-${type}`}
              ref={register({ required: true })}
              onChange={(e) => {
                setSelectedEvent(e.target.value);
              }}
            >
              <option hidden>Select Event</option>
              {resetInfo.assignedEvent !== "" ? 
                metaEventData?.map((event, index) => (
                    <option selected key={index} value={event.id}>
                      {event.name}
                    </option>
                  ))
                : metaEventData?.map((event, index) => (
                    <option key={index} value={event.id}>
                      {event.name}
                    </option>
                  ))}
            </select>
          </Col>
        </Row>
        <Row className="d-flex align-between">
          <Col md="6">
            <h5> Select a category</h5>
            <select
              className="form-control"
              name="categorySelected"
              id={`categorySelected-${type}`}
              ref={register({ required: true })}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
              defaultValue={resetCategory}
              // i need a default value for this for when user clicks on a row, it's category will be set automatically
            >
              ;<option hidden>Select Category</option>
              {categoryList.length !== 0 ? (
                categoryList.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option selected value={resetCategory}>
                  {resetCategory}
                </option>
              )}
            </select>
          </Col>
        </Row>
        <hr />
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

RuleSecondStep.propTypes = {
  stepper: PropTypes.object,
  type: PropTypes.string,
  setRuleSecondStep: PropTypes.func,
  resetEvent: PropTypes.object,
  resetCategory: PropTypes.string,
  addRule: PropTypes.func,
  eventsArray: PropTypes.array,
  rulesCategory: PropTypes.array,
  fetchRuleCategory: PropTypes.func,
  resetInfo: PropTypes.object,
  metaCategoryData: PropTypes.array,
  metaEventData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    metaCategoryData: state.ruleCategoryReducer,
    metaEventData: state.metaDataEventsReducer,
  };
};

export default connect(mapStateToProps, null)(
  RuleSecondStep
);
