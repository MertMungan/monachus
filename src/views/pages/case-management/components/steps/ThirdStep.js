import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
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
import ReactJson from "react-json-view";

import { ArrowLeft, ArrowRight } from "react-feather";

export default function ThirdStep({ selectedAlert = {}, setWizardOpen = () => {}, stepper = {}, }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log("4. step data", data);
    setWizardOpen(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xl={6} md={6}>
            <Card className="mb-4 mt-1" style={{ backgroundColor: "white" }}>
              <CardBody>
                <ReactJson src={selectedAlert.fields[0]} theme="monokai" />
              </CardBody>
            </Card>
          </Col>
        </Row>
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
                setWizardOpen(false);
              }}
            >
              <span className="align-middle d-sm-inline-block d-none">
                Cancel
              </span>
            </Button>
            <Button
              color="primary"
              className="btn-next px-md-3"
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
}
