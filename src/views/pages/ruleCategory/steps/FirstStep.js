import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { addRuleCategory,updateRuleCategory } from "../../../../redux/actions/ruleCategory";
import uuid from "react-uuid";

import { Button, Label, Row, Col } from "reactstrap";
const FirstStep = ({
  categoryData = [],
  addRuleCategory = () => {},
  wizardOpen = false,
  setWizardOpen = () => {},
  setCategory = () => {},
  updateRuleCategory = () => {},
  resetInfo = {},
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (resetInfo.id) {
      let id = resetInfo.id 
      let totalData = { ...data, id};
      updateRuleCategory(totalData)
    } else {
      let id = uuid();
      let totalData = { ...data, id };
  
      addRuleCategory(totalData);
    }
    setWizardOpen(!wizardOpen);
  };

  useEffect(() => {
    if (resetInfo.id) {
      reset({
        name: resetInfo.name,
        description: resetInfo.description,
      });
    }
  }, [resetInfo]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={6}>
            <h5>Category Name</h5>
            <input
              type="text"
              className="form-control textCustomClass mb-1"
              placeholder="Category Name"
              name="name"
              ref={register({ required: true })}
            />
            <h5>Category Description</h5>
            <input
              type="text"
              className="form-control textCustomClass"
              placeholder="Category Description"
              name="description"
              ref={register({ required: true })}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "end" }}>
            <Button.Ripple
              color="secondary"
              className="btn "
              outline
              onClick={() => {
                setWizardOpen(false);
              }}
            >
              <span className="align-middle d-sm-inline-block d-none">
                Cancel
              </span>
            </Button.Ripple>
            <Button type="submit" className="ml-1" color="primary">
              Save
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { categoryData: state.ruleCategoryReducer };
};
export default connect(mapStateToProps, { addRuleCategory,updateRuleCategory })(FirstStep);
