import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Utils as QbUtils } from "react-awesome-query-builder";
import { Label, FormGroup, Row, Col, Input, Form, Button } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";

import { connect } from "react-redux";
// REDUX

function factset(props) {
  const {
    stepper,
    type,
    setEventDescription,
    eventDescription,
    resetDescription,
    setWizardOpen,
    wizardOpen,
    eventList,
  } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (resetDescription !== "") {
      reset({ description: resetDescription });
    }
  }, [resetDescription]);

  const onSubmit = (data) => {
    setEventDescription(data.description);
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormGroup tag={Col} md="6">
            <h5 className="form-label"> Event Description</h5>
            <input
              type="text"
              className="form-control"
              name={`description`}
              id={`description-${type}`}
              placeholder="Enter Your Event Description"
              ref={register({})}
            />
          </FormGroup>
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

factset.propTypes = {
  stepper: PropTypes.object,
  type: PropTypes.string,
  setEventDescription: PropTypes.func,
  resetDescription: PropTypes.string,
  eventList: PropTypes.array,
};

const mapStateToProps = (state) => {
  return { eventList: state.fields };
};

export default connect(mapStateToProps, { })(factset);
