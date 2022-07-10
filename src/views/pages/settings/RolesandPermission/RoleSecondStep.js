import React, { Fragment, useEffect } from "react";
import PropTypes, { bool } from "prop-types";
import { Col, Form, Button, Table } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
// REDUX

function RoleSecondStep(props) {
  const { stepper, setRoleSecondStep, setWizardOpen,resetDashboard,resetCep,resetDataFlow,resetSettings } = props;
  const {
    register,
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setRoleSecondStep(data);
    reset();
    setWizardOpen(false);
  };


  useEffect(() => {
    if (resetDashboard !== bool && resetCep !== bool && resetDataFlow !== bool && resetSettings !== bool) {
      reset({
        dashboardsCRUD: resetDashboard,
        cepCRUD: resetCep,
        dataFlowCRUD: resetDataFlow,
        settingsCRUD: resetSettings,
      });
    }
  }, [resetDashboard, resetCep,resetDataFlow,resetSettings]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Table className="text-nowrap text-center border-bottom" responsive>
          <thead>
            <tr>
              <th className="text-start">Permissions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-start">Dashboards</td>
              <td>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="dashboardsCRUD"
                    id="dashboardsCRUD"
                    data-toggle="toggle"
                    ref={register({})}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="dashboardsCRUD"
                  ></label>
                </div>
              </td>
            </tr>

            <tr>
              <td className="text-start">CEP</td>
              <td>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="cepCRUD"
                    id="cepCRUD"
                    data-toggle="toggle"
                    ref={register({})}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="cepCRUD"
                  ></label>
                </div>
              </td>
            </tr>

            <tr>
              <td className="text-start">Data Flow</td>
              <td>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="dataFlowCRUD"
                    id="dataFlowCRUD"
                    data-toggle="toggle"
                    ref={register({})}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="dataFlowCRUD"
                  ></label>
                </div>
              </td>
            </tr>

            <tr>
              <td className="text-start">Settings</td>
              <td>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="settingsCRUD"
                    id="settingsCRUD"
                    data-toggle="toggle"
                    ref={register({})}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="settingsCRUD"
                  ></label>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
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
              value="Save"
              className="btn btn-primary"
              color="primary"
            />
          </Col>
        </div>
      </Form>
    </Fragment>
  );
}

RoleSecondStep.propTypes = {
  stepper: PropTypes.object,
  type: PropTypes.string,
  setRoleSecondStep: PropTypes.func,
  resetPermissions: PropTypes.func,
  setWizardOpen: PropTypes.func,
  eventList: PropTypes.array,
  addRule: PropTypes.func,
  resetDashboard: PropTypes.bool,
  resetCep: PropTypes.bool,
  resetDataFlow: PropTypes.bool,
  resetSetting: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(RoleSecondStep);
