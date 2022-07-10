import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Utils as QbUtils } from "react-awesome-query-builder";
import { Label, FormGroup, Row, Col, Input, Form, Button } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";

import { connect } from "react-redux";
import {
  fetchEvents,
  addEvents,
  deleteEvents,
} from "../../../../redux/actions/events/index";
// REDUX

function factset(props) {
  const { stepper, type, seteventName, addEvents, setWizardOpen, wizardOpen,resetName} = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    seteventName(data.eventName);
    reset();
  };

  useEffect(() => {
    if (resetName !== "") {
      reset({ eventName: resetName });
    }
  }, [resetName]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormGroup tag={Col} md="6">
          <h5 className="form-label"> Event Name</h5>
            <input
              type="text"
              className="form-control"
              name={`eventName`}
              id={`eventName-${type}`}
              placeholder="Enter Your Event Name"
              ref={register({})}
            />
          </FormGroup>
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
              onClick={() => stepper.next()}
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
  seteventName: PropTypes.func,
  resetName: PropTypes.string,
  eventList: PropTypes.array,
  addEvents: PropTypes.func,
};

const mapStateToProps = (state) => {
  return { eventList: state.fields };
};

export default connect(mapStateToProps, { addEvents })(factset);
