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

export default function SecondStep({ setWizardOpen = () => {} }) {
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
          <Col xl={4} md={4}>
            <Card className="mb-4 mt-1" style={{ backgroundColor: "white" }}>
              <CardBody>
                <CardTitle tag="h4">Event Name</CardTitle>
                <CardSubtitle className="text-muted mb-1"></CardSubtitle>
                <CardText>Sensor 1</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Col xs="12" style={{ textAlign: "End" }}>
          <Button.Ripple
            color="primary"
            className="btn"
            onClick={() => {
              setWizardOpen(false);
            }}
          >
            <span className="align-middle d-sm-inline-block d-none">
              Return
            </span>
          </Button.Ripple>
        </Col>
      </Form>
    </>
  );
}
