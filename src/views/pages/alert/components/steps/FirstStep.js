import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Utils as QbUtils } from "react-awesome-query-builder";
import {
  Row,
  Col,
  Form,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
  Button,
} from "reactstrap";

import { ArrowLeft, ArrowRight } from "react-feather";

const FirstStep = ({
  stepper = {},
  setWizardOpen = () => {},
  selectedAlert = {},
  eventName = "",
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  // console.log("selectedAlert", selectedAlert);
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xl={4} md={4}>
            <Card className="mb-4 mt-1" style={{ backgroundColor: "white" }}>
              <CardBody>
                <CardText>Alert ID: {selectedAlert.eventID}</CardText>
                <CardText>
                  Created Date Time: {selectedAlert.createdDate}
                </CardText>
                <CardText>Event Name: {eventName}</CardText>
                <CardText>Rule ID: {selectedAlert.id}</CardText>
                <CardText>Rule Name: {selectedAlert.name}</CardText>
                <CardText>Rule Category: {selectedAlert.category}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
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
    </>
  );
};

export default FirstStep;
