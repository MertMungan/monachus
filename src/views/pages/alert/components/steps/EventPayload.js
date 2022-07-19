import React from 'react';
import { Label, FormGroup, Row, Col, Input, Form, Button } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";

const FactsetName = ({setWizardOpen=() => {}, stepper = {}}) => {
  return (
    <div>
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
            {/* <Button
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
            </Button> */}
            <Button
              color="primary"
              className="btn-next px-md-3"
              type="submit"
              onClick={() => {
                setWizardOpen(false);
              }}
            >
              <span className="align-middle d-sm-inline-block d-none">
                Return
              </span>
            </Button>
          </Col>
        </div>
    </div>
  );
}

export default FactsetName;
