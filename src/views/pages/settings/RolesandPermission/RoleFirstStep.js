import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { Row, Col, Form, Button } from 'reactstrap'
import { ArrowRight } from 'react-feather'
import { connect } from 'react-redux'
// REDUX
import {createKeycloakClientRoles, updateKeycloakClientRoles} from "../../../../redux/actions/keycloakClientRoles"
import {createMonachusRole} from "../../../../redux/actions/monachusRoles"


function UserFirstStep(props) {
  const {
    stepper,
    type,
    setRoleFirstStep,
    setWizardOpen,
    resetName,
    resetDescription,
    clientRoles,
    createKeycloakClientRoles,
    createMonachusRole,
    monachusRole,
    updateKeycloakClientRoles,
    readOnly,
  } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()


  const onSubmit = (data) => {
    const filteredClientRoles = clientRoles.find(item => item.name === data.roleName)
    if (filteredClientRoles) {
      updateKeycloakClientRoles(data,filteredClientRoles)
    } else {
      createKeycloakClientRoles(data)
    }
    
    setRoleFirstStep(data.roleName, data.roleDescription);
    reset();
  };

  useEffect(() => {
    if (resetName !== '' && resetDescription !== '') {
      reset({
        roleName: resetName,
        roleDescription: resetDescription
      })
    }
  }, [resetName, resetDescription])

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className='d-flex align-between'>
          <Col md='6'>
            <h5> Role Name</h5>
            <input
              type='text'
              className='form-control mb-1'
              name={`roleName`}
              id={`roleName-${type}`}
              placeholder='Enter the Name of Your Role'
              ref={register({ required: true })}
              readOnly={readOnly}
            />
          </Col>
        </Row>
        <Row className='d-flex align-between'>
          <Col md='6'>
            <h5> Role Description</h5>
            <input
              type='text'
              className='form-control mb-1'
              name={`roleDescription`}
              id={`roleDescription-${type}`}
              placeholder='Enter the Description of Your Role'
              ref={register({ required: true })}
            />
          </Col>
        </Row>

        <hr />
        <div className='d-flex justify-content-end'>
          <Col xs='4' style={{ textAlign: 'End' }}>
            <Button.Ripple
              color='secondary'
              className='btn mr-1'
              outline
              onClick={() => {
                reset({}), setWizardOpen(false)
              }}
            >
              <span className='align-middle d-sm-inline-block d-none'>
                Cancel
              </span>
            </Button.Ripple>
            <Button
              color='primary'
              className='btn-next px-md-3'
              type='submit'
              onClick={() => {
                stepper.next()
              }}
            >
              <span className='align-middle d-sm-inline-block d-none'>
                Next
              </span>
              <ArrowRight
                size={14}
                className='align-middle ml-sm-25 ml-0'
              ></ArrowRight>
            </Button>
          </Col>
        </div>
      </Form>
    </Fragment>
  )
}

UserFirstStep.propTypes = {
  stepper: PropTypes.object,
  type: PropTypes.string,
  setRoleFirstStep: PropTypes.func,
  resetName: PropTypes.string,
  resetDescription: PropTypes.string,
  createKeycloakClientRoles: PropTypes.func,
  clientRoles: PropTypes.array,
  monachusRoles: PropTypes.array,
  createMonachusRole: PropTypes.func,
  updateKeycloakClientRoles: PropTypes.func,
  readOnly: PropTypes.bool
  /*   addUser: PropTypes.func,
   */
}

const mapStateToProps = (state) => {
  return {
    rolesList: state.rolesReducer,
    clientRoles: state.keycloakRolesClinetReducer,
    monachusRoles: state.monachusRoleReducer
  }
}

export default connect(mapStateToProps, {createKeycloakClientRoles,createMonachusRole,updateKeycloakClientRoles})(UserFirstStep);
