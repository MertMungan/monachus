import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Utils as QbUtils } from "react-awesome-query-builder";
import {
  Label,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Breadcrumb,
  BreadcrumbItem,
  CardText,
  CardLink,
  CardHeader,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";

import { connect } from "react-redux";
import {
  fetchEvents,
  addRule,
  deleteEvents,
} from "../../../redux/actions/rules/index";
// REDUX

function RuleFourthStep(props) {
  const { stepper, type, setRuleFourthStep, addRule, setWizardOpen } = props;

  const [selectedCard, setSelectedCard] = useState("");
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
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xl={4} md={4}>
            <Card className="mb-4 mt-1" style={{ backgroundColor: "white" }}>
              <CardBody>
                <CardTitle tag="h4">Email</CardTitle>
                <CardSubtitle className="text-muted mb-1"></CardSubtitle>
                <CardText>
                  Send out notifications via email and design them with an
                  integrated template editor.
                </CardText>
                <Row style={{textAlign:"right"}}>
                  <Col>
                  <CardLink
                  href="/"
                  onClick={(e) => {
                    setRuleFourthStep("Email");
                    e.preventDefault();
                  }}
                >
                  Set
                </CardLink>
                  </Col>
                </Row>
                
              </CardBody>
            </Card>
          </Col>
          <Col xl={4} md={4}>
            <Card className="mb-4 mt-1" style={{ backgroundColor: "white" }}>
              <CardBody>
                <CardTitle tag="h4">API</CardTitle>
                <CardSubtitle className="text-muted mb-1"></CardSubtitle>
                <CardText>
                  Pull notifications from the API to show them in your user
                  interface.
                </CardText>
                <Row style={{textAlign:"right"}}>
                  <Col>
                  <CardLink
                  href="/"
                  onClick={(e) => {
                    setRuleFourthStep("API");
                    e.preventDefault();
                  }}
                >
                  Set
                </CardLink>
                  </Col>
                </Row>
               
              </CardBody>
            </Card>
          </Col>
          <Col xl={4} md={4}>
            <Card className="mb-4 mt-1" style={{ backgroundColor: "white" }}>
              <CardBody>
                <CardTitle tag="h4">Web Push</CardTitle>
                <CardSubtitle className="text-muted mb-1"></CardSubtitle>
                <CardText>
                  Use push notifications to modern browsers like Firefox and
                  chrome.
                </CardText>
                <Row style={{textAlign:"right"}}>
                  <Col>
                    <CardLink
                      href="/"
                      onClick={(e) => {
                        setRuleFourthStep("Web Push");
                        e.preventDefault();
                      }}
                    >
                      Set
                    </CardLink>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={4} md={4}>
            <Card className="mb-4" style={{ backgroundColor: "white" }}>
              <CardBody>
                <CardTitle tag="h4">Mobile Push</CardTitle>
                <CardSubtitle className="text-muted mb-1"></CardSubtitle>
                <CardText>
                  Forward your notifications to iOS and Android devices.
                </CardText>
                <Row style={{textAlign:"right"}}>
                  <Col>
                  <CardLink
                  href="/"
                  onClick={(e) => {
                    setRuleFourthStep("Mobile Push");
                    e.preventDefault();
                  }}
                >
                  Set
                </CardLink>
                  </Col>
                </Row>
               
              </CardBody>
            </Card>
          </Col>
          <Col xl={4} md={4}>
            <Card className="mb-4" style={{ backgroundColor: "white" }}>
              <CardBody>
                <CardTitle tag="h4">Messaging</CardTitle>
                <CardSubtitle className="text-muted mb-1"></CardSubtitle>
                <CardText>
                  Use modern messaging solutions like WhatsApp.
                </CardText>
                <Row style={{textAlign:"right"}}>
                  <Col>
                  <CardLink
                  href="/"
                  onClick={(e) => {
                    setRuleFourthStep("Messaging");
                    e.preventDefault();
                  }}
                >
                  Set
                </CardLink>
                  </Col>
                </Row>
               
              </CardBody>
            </Card>
          </Col>

          <Col xl={4} md={4}>
            <Card className="mb-4" style={{ backgroundColor: "white" }}>
              <CardBody>
                <CardTitle tag="h4">SMS</CardTitle>
                <CardSubtitle className="text-muted mb-1"></CardSubtitle>
                <CardText>
                  Send urgent messages via SMS when they have not been received
                  via other channels.
                </CardText>
                <Row style={{textAlign:"right"}}>
                  <Col>
                  <CardLink
                  href="/"
                  onClick={(e) => {
                    setRuleFourthStep("SMS");
                    e.preventDefault();
                  }}
                >
                  Set
                </CardLink>
                  </Col>
                </Row>
                
              </CardBody>
            </Card>
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
            <Button color="primary" className="btn-next px-md-3" type="submit">
              <span className="align-middle d-sm-inline-block d-none">
                Save
              </span>
            </Button>
          </Col>
        </div>
      </Form>
    </Fragment>
  );
}

RuleFourthStep.propTypes = {
  stepper: PropTypes.object,
  type: PropTypes.string,
  setRuleFourthStep: PropTypes.func,
  eventList: PropTypes.array,
  addRule: PropTypes.func,
  setWizardOpen: PropTypes.func,
};

const mapStateToProps = (state) => {
  return { eventList: state.fields };
};

export default connect(mapStateToProps, { addRule })(RuleFourthStep);
