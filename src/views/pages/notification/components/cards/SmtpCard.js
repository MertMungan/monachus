// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Modal,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  ModalHeader,
  CustomInput,
  FormFeedback,
} from "reactstrap";

// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Home, Check, X, Briefcase } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

// ** REDUX
import { connect } from "react-redux";
import {
  addSmtpData,
  fetchSmtpData,
  deleteSmtpData,
  updateSmtpData,
} from "../../../../../redux/actions/notificationSmtp";
import Table from "../../../recommedition/components/Table";

const SmtpCard = ({
  smtpData = [],
  selectedRows = [],
  addSmtpData = () => {},
  fetchSmtpData = () => {},
  deleteSmtpData = () => {},
  updateSmtpData = () => {},
}) => {
  // ** States
  const [show, setShow] = useState(false);
  const [smtpResult, setSmtpResult] = useState([]);
  const [smtpTotalData, setSmtpTotalData] = useState([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (smtpResult.length > 0) {
      const currentSmtpData = smtpTotalData.find(
        (template) => template.id === selectedRows[0]?.id
      );
      if (currentSmtpData) {
        updateSmtpData(data, selectedRows[0].id);
      } else {
        addSmtpData(data);
      }
    } else {
      addSmtpData(data);
    }
  };

  const handleConversion = (data, type = "SMTP") => {
    const array = Object.entries(smtpData?.configured).map(([k, v]) => {
      if (v.type === type) {
        v.id = k;
        return v;
      }
    });

    const newData = array.filter(function (element) {
      return element !== undefined;
    });

    const current = newData?.map((element) => {
      return {
        id: element?.id,
        Type: element?.type,
        Host: element?.properties.host,
        "User Name": element?.properties.username,
      };
    });
    return { tableData: current, manipulationData: newData };
  };

  useEffect(() => {
    fetchSmtpData();
  }, []);

  useEffect(() => {
    if (smtpData.configured) {
      setSmtpResult(handleConversion(smtpData.configured, "SMTP").tableData);
      setSmtpTotalData(
        handleConversion(smtpData.configured, "SMTP").manipulationData
      );
    }
  }, [smtpData, show]);

  const onDiscard = () => {
    setShow(true);
    const smtpIndex = smtpTotalData?.findIndex(
      (element) => element.id === selectedRows[0]?.id
    );

    if (selectedRows.length > 0) {
      reset({
        priority: smtpTotalData[smtpIndex]?.priority,
        condition: smtpTotalData[smtpIndex]?.condition,
        testMode: smtpTotalData[smtpIndex]?.test,
        conditionEnable: smtpTotalData[smtpIndex]?.enabled,
        host: smtpTotalData[smtpIndex]?.properties.host,
        port: smtpTotalData[smtpIndex]?.properties.port,
        username: smtpTotalData[smtpIndex]?.properties.username,
        password: smtpTotalData[smtpIndex]?.properties.password,
        fromEmail: smtpTotalData[smtpIndex]?.properties.fromEmail,
        fromName: smtpTotalData[smtpIndex]?.properties.fromName,
      });
    }
  };

  const modalClose = () => {
    setShow(false);
  };

  const onDelete = () => {
    deleteSmtpData(selectedRows[0].id);
  };

  return (
    <Fragment>
      <Card>
        <CardBody className="text-center">
          <Home className="font-large-2 mb-1" />
          <CardTitle tag="h5">Custom SMTP Server</CardTitle>
          <CardText>Send emails using a custom email server</CardText>
          <Button
            color="primary"
            onClick={() => {
              setShow(true);
              reset({});
            }}
          >
            Show
          </Button>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        onClosed={modalClose}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="pb-5 px-sm-4">
          <h1 className="address-title text-center mb-1">Custom SMTP Server</h1>
          <Row
            tag="form"
            className="gy-1 gx-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12} md={12}>
              <Label className="form-label" for="condition">
                Condition
              </Label>
              <input
                type="text"
                className="form-control textCustomClass mb-1"
                placeholder="condtion"
                name="condtion"
                ref={register({ required: true })}
              />
              <p className="address-subtitle text-center mb-1">
                The condition, when the integration should be used.
              </p>
              {errors.firstName && (
                <FormFeedback>Please enter a valid First Name</FormFeedback>
              )}
            </Col>
            <Col xs={12}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="testMode"
                  id="testMode"
                  data-toggle="toggle"
                  ref={register({})}
                />
                <label className="custom-control-label" htmlFor="testMode">
                  Test Mode
                </label>
              </div>
              <p className="text-left mb-1">
                Use this integration only for production or development mode.
              </p>
            </Col>
            <Col xs={12}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="conditionEnable"
                  id="conditionEnable"
                  data-toggle="toggle"
                  ref={register({})}
                />
                <label
                  className="custom-control-label"
                  htmlFor="conditionEnable"
                >
                  Enabled
                </label>
              </div>
              <p className="text-left mb-1">
                Disable the ingration without deleting it.
              </p>
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="condition">
                Priority
              </Label>
              <input
                type="number"
                className="form-control textCustomClass mb-1"
                placeholder="priority"
                name="priority"
                ref={register({ required: true })}
              />
              <p className="address-subtitle text-center mb-1">
                Define a priority when you have configured multiple integrations
                for the same channel such as MobilePush.
              </p>
              {errors.firstName && (
                <FormFeedback>Please enter a valid First Name</FormFeedback>
              )}
            </Col>
            <Col
              xs={12}
              md={{
                offset: 3,
                size: 6,
              }}
            >
              <hr />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="condition">
                Host
              </Label>
              <input
                type="text"
                className="form-control textCustomClass mb-1"
                name="host"
                ref={register({ required: true })}
              />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="condition">
                Port
              </Label>
              <input
                type="number"
                className="form-control textCustomClass mb-1"
                name="port"
                ref={register({ required: true })}
              />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="condition">
                Username
              </Label>
              <input
                type="text"
                className="form-control textCustomClass"
                name="username"
                ref={register({ required: true })}
              />
              <p className="text-left mb-1">Username for your SMTP server.</p>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="condition">
                Password
              </Label>
              <input
                type="password"
                className="form-control textCustomClass"
                name="password"
                ref={register({ required: true })}
              />
              <p className="text-left mb-1">Password for your SMTP server.</p>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="condition">
                From Email
              </Label>
              <input
                type="email"
                className="form-control textCustomClass"
                name="fromEmail"
                ref={register({ required: true })}
              />
              <p className="text-left mb-1">The sender email address.</p>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="condition">
                From Name
              </Label>
              <input
                type="text"
                className="form-control textCustomClass"
                name="fromName"
                ref={register({ required: true })}
              />
              <p className="text-left mb-1">The name of the sender.</p>
            </Col>
            <Col className="text-center" xs={12}>
              <Button type="submit" className="me-1 mt-2 mr-1" color="primary">
                Submit
              </Button>
              <Button
                type="reset"
                className="mt-2"
                color="secondary"
                outline
                onClick={modalClose}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <Table 
      list={smtpResult} 
      showDetails={onDiscard} 
      onDelete={onDelete} 
      useImport={false}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    smtpData: state.notificationSmtpReducer,
    selectedRows: state.tableRowsReducer,
  }; // PROP!!!!! collectionList !!!
};

export default connect(mapStateToProps, {
  addSmtpData,
  fetchSmtpData,
  deleteSmtpData,
  updateSmtpData,
})(SmtpCard);
