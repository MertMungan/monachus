import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Label,
  FormGroup,
  Row,
  Col,
  Container,
  Input,
  Form,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Badge,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export const FactArray = (props) => {
  const { SetCurrentArrayItemsList, currentArrayList } = props;
  const [arrayItemTextToValue, setArrayItemTextToValue] = useState([]);

  // MAKE IT UTIL FUNCTION
  const camelizeText = (text) => {
    text = text.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
    return text.substr(0, 1).toLowerCase() + text.substr(1);
  };
  // MAKE IT UTIL FUNCTION
  const {
    register: registerFactArrayItems,
    handleSubmit: handleFactArrayItems,
    formState: { errors: factArrayItemsError },
    reset: resetFactArrayItems,
  } = useForm();
  const onFactArrayItemsSubmit = (data) => {
    if (currentArrayList.length > 0) {
      SetCurrentArrayItemsList([...currentArrayList, data]);
    } else SetCurrentArrayItemsList([data]);
    resetFactArrayItems();
  };

  return (
    <>
      <hr />
      <Form onSubmit={handleFactArrayItems(onFactArrayItemsSubmit)}>
        <Row>
          <FormGroup tag={Col} md="5">
            <Label className="form-label" for="factArrayName">
              Name
            </Label>
            <Badge color="info" className="badge-glow ml-1">
              *Required
            </Badge>
            <input
              type="text"
              name="factArrayName"
              className="form-control"
              id="factArrayName"
              placeholder="Display Name"
              ref={registerFactArrayItems({
                required: "This is required! Min Length: 3 Characters!",
                minLength: 3,
              })}
              onChange={(e) =>
                setArrayItemTextToValue(camelizeText(e.target.value))
              }
            />
            {factArrayItemsError?.factArrayName?.message !== undefined && (
              <div>
                {factArrayItemsError?.factArrayName?.message !== undefined &&
                  "Min 3 cahr Length"}
              </div>
            )}
          </FormGroup>
          <FormGroup tag={Col} md="5">
            <Label className="form-label" for="factArrayValue">
              Value
            </Label>
            <Badge color="info" className="badge-glow ml-1">
              *Required
            </Badge>
            <input
              type="text"
              name="factArrayValue"
              id="factArrayValue"
              className="form-control"
              placeholder="You can not type here"
              ref={registerFactArrayItems({ required: "This is required." })}
              value={arrayItemTextToValue}
              readOnly
            />
            {factArrayItemsError?.factArrayName?.message !== undefined && (
              <div>
                {factArrayItemsError?.factArrayName?.message !== undefined &&
                  "Min 3 cahr Length"}
              </div>
            )}
          </FormGroup>
          <FormGroup tag={Col} md="2">
            <Label className="form-label" for={`factArrayValue`}>
              Press To Add
            </Label>
            <input
              type="submit"
              className="btn btn-primary mb-1"
              value="Add to Array"
              onClick={(e) => e.preventDefault()}
            />
          </FormGroup>
        </Row>
      </Form>
      <hr />
      <span>Array Items</span>
      <ListGroup>
        {currentArrayList.length > 0 &&
          currentArrayList.map((item, index) => (
            <ListGroupItem key={index}>
              {item.factArrayName} - {item.factArrayValue}
            </ListGroupItem>
          ))}
      </ListGroup>
    </>
  );
};

FactArray.propTypes = {
  props: PropTypes,
  SetCurrentArrayItemsList: PropTypes.func,
  arrayItemTextToValue: PropTypes.array,
};

const mapStateToProps = (state) => ({});

export default connect(null, null)(FactArray);
