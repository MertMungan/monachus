import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Label, Row, Col, Form, Button } from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";

// REDUX
import { connect } from "react-redux";
import { fetchRoles } from "../../../../redux/actions/roles";
import { fetchKeycloakRoles } from "../../../../redux/actions/keycloakRoles";
import {
  createKeycloakUser,
  updateKeycloakUser,
} from "../../../../redux/actions/keycloakUsers";
import { fetchKeycloakClientRoles } from "../../../../redux/actions/keycloakClientRoles";

function UserFirstStep(props) {
  const {
    type,
    setWizardOpen,
    resetName,
    resetEmail,
    resetContact,
    resetRoles,
    resetInfo,
    createKeycloakUser,
    updateKeycloakUser,
    fetchKeycloakClientRoles,
    clientRoles,
  } = props;
  const [roles, SetRoles] = useState("");
  const [roleArray, setRoleArray] = useState([]);
  const [defaultValue, setDefaultValue] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  console.log("resetInfo", resetInfo);
  useEffect(() => {
    /*     fetchKeycloakClientRoles(); */
  }, []);

  const onSubmit = (data) => {
    if (resetInfo?.user?.id) {
      let newRoles = roles.reduce((acc, curr) => {
        acc.push(curr.value);
        return acc;
      }, []);
      data = { ...data, roles: newRoles };
      console.log("data", data);
      updateKeycloakUser(resetInfo?.user?.id, data);
      reset();
      setWizardOpen(false);
    } else {
      console.log("data", data);
      // i just need role's value here
      let newRoles = roles.reduce((acc, curr) => {
        acc.push(curr.value);
        return acc;
      }, []);

      createKeycloakUser(data, newRoles);
      reset();
      setWizardOpen(false);
    }
  };

  useEffect(() => {
    if (resetInfo) {
      reset({
        userName: resetInfo?.user?.username,
        firstName: resetInfo?.user?.firstName,
        lastName: resetInfo?.user?.lastName,
        userEmail: resetInfo?.user?.email,
        userContact: resetInfo?.user?.createdTimestamp,
      });
    }

    const roleOptions = resetInfo?.userRoles?.mappings?.map((role) => {
      return {
        value: role.name,
        label: role.name,
        color: "#ed2419",
        isFixed: false,
      };
    });
    SetRoles(roleOptions);
  }, [resetInfo]);

  console.log("clientRoles", clientRoles);

  useEffect(() => {
    if (clientRoles.length > 0) {
      const roleOptions = clientRoles?.map((role) => {
        return {
          value: role.name,
          label: role.name,
          color: "#ed2419",
          isFixed: false,
        };
      });
      setRoleArray(roleOptions);
    }
  }, [clientRoles]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="d-flex align-between">
          <Col md="6">
            <h5> User Name</h5>
            <input
              type="text"
              className="form-control mb-1"
              name={`userName`}
              id={`userName-${type}`}
              placeholder="Enter the Name of the User"
              ref={register({ required: true })}
            />
          </Col>
        </Row>
        <Row className="d-flex align-between">
          <Col md="6">
            <h5> User First Name</h5>
            <input
              type="text"
              className="form-control mb-1"
              name={`firstName`}
              id={`firstName-${type}`}
              placeholder="Enter the Name of the User"
              ref={register({ required: true })}
            />
          </Col>
        </Row>
        <Row className="d-flex align-between">
          <Col md="6">
            <h5> User Last Name</h5>
            <input
              type="text"
              className="form-control mb-1"
              name={`lastName`}
              id={`lastName-${type}`}
              placeholder="Enter the Name of the User"
              ref={register({ required: true })}
            />
          </Col>
        </Row>
        <Row className="d-flex align-between">
          <Col md="6">
            <h5> User Email</h5>
            <input
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              className="form-control mb-1"
              name={`userEmail`}
              id={`userEmail-${type}`}
              placeholder="Enter the Email of the User"
              ref={register({ required: true })}
            />
          </Col>
        </Row>
        <Row className="d-flex align-between">
          <Col md="6">
            <h5>User Password</h5>
            <input
              type="password"
              className="form-control mb-1"
              name={`userPassword`}
              id={`userContact-${type}`}
              ref={register({ required: true })}
            />
          </Col>
        </Row>
        <Row className="d-flex align-between">
          <Col className="mb-1" md="6" sm="6">
            <Label>User Roles</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              // defaultValue={{label: defaultValue}}
              isMulti
              name="userRoles"
              placeholder="Choose a role"
              options={roleArray}
              className="react-select"
              classNamePrefix="select"
              onChange={(data) => SetRoles(data)}
              ref={register({})}
              value={roles}
            />
          </Col>
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

UserFirstStep.propTypes = {
  stepper: PropTypes.object,
  type: PropTypes.string,
  setUserFirstStep: PropTypes.func,
  resetName: PropTypes.string,
  resetEmail: PropTypes.string,
  resetContact: PropTypes.string,
  resetInfo: PropTypes.object,
  eventList: PropTypes.array,
  userList: PropTypes.array,
  addRule: PropTypes.func,
  fetchRoles: PropTypes.func,
  rolesList: PropTypes.array,
  keycloakRolesList: PropTypes.array,
  fetchKeycloakRoles: PropTypes.func,
  createKeycloakUser: PropTypes.func,
  updateKeycloakUser: PropTypes.func,
  keycloakUserData: PropTypes.array,
  clientRoles: PropTypes.array,
  fetchKeycloakClientRoles: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    userList: state.usersReducer,
    clientRoles: state.keycloakRolesClinetReducer,
  };
};

export default connect(mapStateToProps, {
  fetchRoles,
  fetchKeycloakRoles,
  createKeycloakUser,
  updateKeycloakUser,
  fetchKeycloakClientRoles,
})(UserFirstStep);
