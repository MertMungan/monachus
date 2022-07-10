/* eslint-disable */
import React, { Fragment, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
  Label,
  FormGroup,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Badge,
  Card,
  CardBody,
} from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";
import FactArray from "../factArray/index";
// REDUX
import { connect } from "react-redux";
import { fetchRule, addRule } from "../../../../redux/actions/rules/index";
import {
  fetchEvents,
  updateEvents,
} from "../../../../redux/actions/events/index";
import { toast } from "react-toastify";
import { fetchTree } from "../../../../redux/actions/treeConfig/index";
import { FilledInput } from "@mui/material";
import FieldsTable from "./fieldsTable";
// REDUX

function addFacts(props) {
  const {
    stepper,
    type,
    setFactFields,
    fieldList,
    updateEvents,
    wizardOpen,
    setWizardOpen,
    createdEvent,
    resetFields,
    eventName,
    showFieldsTable,
    setShowFieldsTable,
    resetEvent,
  } = props;
  const [selectedType, setSelectedType] = useState("");
  const [isNumberSlider, setIsNumberSlider] = useState(false);
  const [initBooleanValue, setInitBooleanValue] = useState(false);
  //const [arrayRegisterState, setArrayRegisterState] = useState({});
  const [currentArrayList, setCurrentArrayList] = useState([]);
  const [fieldsForTable, setFieldsForTable] = useState([]);
  const [name, setName] = useState("");
  let buttonRef = useRef();

  const SetCurrentArrayItemsList = (arrayItems) =>
    setCurrentArrayList(arrayItems);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setName(eventName);
  }, [eventName]);

  const onSubmit = (data) => {
    setFieldsForTable(data);
    /*  if (fieldsForTable.length > 0) {
      setFactFields(fieldsForTable);
    } */
    /* setFieldsForTable(data);
      
      setFactFields(data);
      setCurrentArrayList([
        {
          factDefinition: data.factDefinition,
          factType: data.factType,
        },
      ]);
      setWizardOpen(false); */

    /*  let found = false;
    // we need to check if the data passed to onSubmit as an object matches other objects in the fieldList's fields array
    for (let i = 0; i < fieldList.length; i++) {
      fieldList[i].fields.forEach((field) => {
        if (field.factDefination === data.factDefination) {
          //  debugger;
          found = true;
        }
      });
    }

    // if found is true, then that means the fact data is already in the fieldList's fields array and we need to prevent it from being added again
    if (found) {
      toast.error("Fact already exists");
      reset();
      return;
    } else {
      // if found is false, then we need to add the fact data to the fieldList's fields array
      if (selectedFact.eventId) {
        if (currentArrayList.length > 0) {
          updateEvents(selectedFact.eventId, {
            factDefination: data.factDefination,
            factType: data.factType,
            factArrayList: currentArrayList,
          });
        } else if (currentArrayList.length === 0) {
          updateEvents(selectedFact.eventId, data);
        } else {
          return;
        }
      } else {
        if (currentArrayList.length > 0) {
          updateEvents(createdEvent, {
            factDefination: data.factDefination,
            factType: data.factType,
            factArrayList: currentArrayList,
          });
        } else if (currentArrayList.length === 0) {
          updateEvents(createdEvent, data);
        } else {
          return;
        }
      }
    } */
    // then after the check, we need to reset the form
    reset();
    //after everything, a fact that wasn't already in the fieldList's fields array is added twice and then for four times. why?
  };

  const detailsOfTheType = () => {
    switch (selectedType) {
      case "string":
        return <></>;
      case "number":
        return <></>;
      case "boolean":
        return <></>;
      case "array":
        return (
          <FactArray
            currentArrayList={currentArrayList}
            SetCurrentArrayItemsList={SetCurrentArrayItemsList}
          />
        );
      case "date":
        return (
          <>
            {/* <FormGroup tag={Col} md='6'>
              <Label className='form-label' for={`factMinValue`}>
                Min
              </Label>
              <Badge color='info' className='badge-glow ml-1'>
                *Required
              </Badge>
              <input
                className='form-control'
                type='date'
                name={`factMinValue`}
                id={`factMinValue`}
                placeholder='Min Value'
                ref={register()}
              />
            </FormGroup>
            <FormGroup tag={Col} md='6'>
              <Label className='form-label' for={`factMaxValue`}>
                Max
              </Label>
              <input
                className='form-control'
                type='date'
                name={`factMaxValue`}
                id={`factMaxValue`}
                placeholder='Max Value'
                ref={register()}
              />
            </FormGroup> */}
          </>
        );
      case "time":
        return (
          <>
            {/* <FormGroup tag={Col} md='6'>
              <Label className='form-label' for={`factMinValue`}>
                Min
              </Label>
              <Badge color='info' className='badge-glow ml-1'>
                *Required
              </Badge>
              <input
                className='form-control'
                type='time'
                name={`factMinValue`}
                id={`factMinValue`}
                placeholder='Min Value'
                ref={register()}
              />
            </FormGroup>
            <FormGroup tag={Col} md='6'>
              <Label className='form-label' for={`factMaxValue`}>
                Max
              </Label>
              <input
                className='form-control'
                type='time'
                name={`factMaxValue`}
                id={`factMaxValue`}
                placeholder='Max Value'
                ref={register()}
              />
            </FormGroup> */}
          </>
        );
      case "dateTime":
        return (
          <>
            {/* <FormGroup tag={Col} md='6'>
              <Label className='form-label' for={`factMinValue`}>
                Min
              </Label>
              <Badge color='info' className='badge-glow ml-1'>
                *Required
              </Badge>
              <input
                className='form-control'
                type='datetime-local'
                name={`factMinValue`}
                id={`factMinValue`}
                placeholder='Min Value'
                ref={register()}
              />
            </FormGroup>
            <FormGroup tag={Col} md='6'>
              <Label className='form-label' for={`factMaxValue`}>
                Max
              </Label>
              <input
                className='form-control'
                type='datetime-local'
                name={`factMaxValue`}
                id={`factMaxValue`}
                placeholder='Max Value'
                ref={register()}
              />
            </FormGroup> */}
          </>
        );
      default:
        break;
    }
  };

  return (
    <Fragment>
      <Card>
        <Card-Body>
          {/* <h5 for="eventList">Event List</h5> */}
          <select
            className="form-control"
            id="eventList"
            name="eventList"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.value === "") return;
              setSelectedFact(
                fieldList.find((field) => field.eventId === e.target.value)
              );
            }}
          >
            <option value="">Select Event Set</option>
            {/*  {fieldList?.map((field) => (
              
              <option key={field.eventId} value={field.eventId}>
                {field.eventName}
              </option>
            ))} */}

            {fieldList?.map((field) => (
              <option
                key={field.eventId}
                value={field.eventId}
                selected={field.eventId === createdEvent}
              >
                {field.eventName}
              </option>
            ))}
          </select>
        </Card-Body>
      </Card>
      {/* <div className="content-header">
        <h5 className="mb-0">Event Details</h5>
        <span className="text-muted">Enter Your Event Details.</span>
      </div> */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormGroup tag={Col} md="6">
            <h5 className="form-label" for={`factType`}>
              Attribute Type
            </h5>
            <select
              className="form-control"
              id="factType"
              name="factType"
              ref={register}
              onChange={(e) => {
                // registerArrayFormAction()
                setCurrentArrayList([]);
                setSelectedType(e.target.value);
              }}
            >
              <option value="">Please Select A Type</option>
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
              <option value="array">array</option>
              <option value="date">date</option>
              <option value="time">time</option>
              <option value="dateTime">dateTime</option>
            </select>
          </FormGroup>
          <FormGroup tag={Col} md="6">
            <h5 className="form-label" for={`factDefination`}>
              Attribute Definition
            </h5>
            <input
              className="form-control"
              type="text"
              name={`factDefination`}
              id={`factDefination`}
              placeholder="Enter Your Attribute Name"
              ref={register({ required: true })}
              disabled={selectedType === ""}
            />
          </FormGroup>
        </Row>
        {selectedType !== "array" &&
          selectedType !== "switch" &&
          selectedType !== "multiswitch" && <Row>{detailsOfTheType()}</Row>}

        {selectedType === "array" ||
        selectedType === "switch" ||
        selectedType === "multiswitch"
          ? detailsOfTheType()
          : null}
        <hr />
        <div className="d-flex">
          <Col xs="2">
            <Button.Ripple
              color="secondary"
              className="btn-prev"
              outline
              onClick={() => stepper.previous()}
            >
              <ArrowLeft
                size={14}
                className="align-middle mr-sm-25 mr-0"
              ></ArrowLeft>
              <span className="align-middle d-sm-inline-block d-none">
                Previous
              </span>
            </Button.Ripple>
          </Col>
          <Col xs="10" style={{ textAlign: "end" }}>
            <Button
              className="btn-prev mr-1"
              outline
              onClick={() => {
                reset({});
                setWizardOpen(false);
              }}
            >
              Cancel
            </Button>
            <input
              type="submit"
              value="Add Attribute"
              className="btn btn-primary"
              color="primary"
              onClick={(e) => {
                setShowFieldsTable(true);
              }}
            />
          </Col>
        </div>
        <hr />
        {showFieldsTable && fieldsForTable && (
          <FieldsTable
            listData={fieldsForTable}
            eventName={name}
            setFields={setFactFields}
            setWizardOpen={setWizardOpen}
            resetFields={resetEvent.fields}
          />
        )}
      </Form>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    fieldList: state.fields,
  };
};

addFacts.propTypes = {
  fieldList: PropTypes.array,
  updateEvents: PropTypes.func,
};

export default connect(mapStateToProps, { updateEvents })(addFacts);
/* eslint-disable */
