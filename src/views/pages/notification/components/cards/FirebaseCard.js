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
import { useForm, Controller } from "react-hook-form";
import { Home, Check, X, Briefcase } from "react-feather";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

// ** REDUX
import { connect } from "react-redux";
import {
  addFirebaseData,
  fetchFirebaseData,
  updateFirebaseData,
  deleteFirebaseData,
} from "../../../../../redux/actions/notificationFirebase";
import Table from "../../../recommedition/components/Table";

const FirebaseCard = ({
  fireBaseData = [],
  selectedRows = [],
  addFirebaseData = () => {},
  fetchFirebaseData = () => {},
  updateFirebaseData = () => {},
  deleteFirebaseData = () => {},
}) => {
  // ** States
  const [show, setShow] = useState(false);
  const [firebaseResult, setFirebaseResult] = useState([]);
  const [firebaseTotalData, setFirebaseTotalData] = useState([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (firebaseResult.length > 0) {
      const currentFirebaseData = firebaseTotalData.find(
        (template) => template.id === selectedRows[0]?.id
      );
      if (currentFirebaseData) {
        updateFirebaseData(data, selectedRows[0].id);
      } else {
        addFirebaseData(data);
      }
    } else {
      addFirebaseData(data);
    }
  };
  const handleConversion = (data, type = "FIREBASE") => {
    const array = Object.entries(fireBaseData?.configured).map(([k, v]) => {
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
        ProjectID: element?.properties?.projectId,
        Priority: element?.priority,
      };
    });
    return { tableData: current, manipulationData: newData };
  };
  useEffect(() => {
    fetchFirebaseData();
  }, []);

  useEffect(() => {
    if (fireBaseData.configured) {
      setFirebaseResult(
        handleConversion(fireBaseData.configured, "Firebase").tableData
      );
      setFirebaseTotalData(
        handleConversion(fireBaseData.configured, "Firebase").manipulationData
      );
    }
  }, [fireBaseData, show]);

  const onDiscard = () => {
    setShow(true);
    const firebaseDataIndex = firebaseTotalData?.findIndex(
      (element) => element.id === selectedRows[0]?.id
    );

    if (selectedRows.length > 0) {
      reset({
        priority: firebaseTotalData[firebaseDataIndex]?.priority,
        condition: firebaseTotalData[firebaseDataIndex]?.condition,
        projectID: firebaseTotalData[firebaseDataIndex]?.properties.projectId,
        credentials:
          firebaseTotalData[firebaseDataIndex]?.properties.credentials,
        testMode: firebaseTotalData[firebaseDataIndex]?.test,
        conditionEnable: firebaseTotalData[firebaseDataIndex]?.enabled,
        silentAndroid:
          firebaseTotalData[firebaseDataIndex]?.properties.silentAndroid,
        silentiOS: firebaseTotalData[firebaseDataIndex]?.properties.silentIOS,
      });
    }
  };

  const modalClose = () => {
    setShow(false);
  };

  const onDelete = () => {
    deleteFirebaseData(selectedRows[0].id);
  };
  return (
    <Fragment>
      <Card>
        <CardBody className="text-center">
          <Home className="font-large-2 mb-1" />
          <CardTitle tag="h5">Firebase</CardTitle>
          <CardText>
            Send Push notifications to iOS and Android devices using
            MessageBird.
          </CardText>
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
          <h1 className="address-title text-center mb-1">Firebase</h1>
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
                className="form-control textCustomClass"
                id="condition"
                placeholder="properties.myProp == 1"
                name="condition"
                ref={register({ required: true })}
              />
              <p className="address-subtitle text-center mb-1">
                The condition, when the integration should be used.
              </p>
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
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="priority">
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
            <Col xs={12} md={12}>
              <Label className="form-label" for="Project ID">
                Project ID
              </Label>
              <input
                type="text"
                className="form-control textCustomClass mb-1"
                placeholder="projectID"
                name="projectID"
                ref={register({ required: true })}
              />
              {errors.firstName && (
                <FormFeedback>Please enter a valid First Name</FormFeedback>
              )}
            </Col>
            <Col xs={12}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="silentAndroid"
                  id="silentAndroid"
                  data-toggle="toggle"
                  ref={register({})}
                />
                <label className="custom-control-label" htmlFor="silentAndroid">
                  Silent (Android)
                </label>
              </div>
              <p className="text-left mb-1">
                Send silent notifications to Android
              </p>
            </Col>
            <Col xs={12}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="silentiOS"
                  id="silentiOS"
                  data-toggle="toggle"
                  ref={register({})}
                />
                <label className="custom-control-label" htmlFor="silentiOS">
                  Silent (iOS)
                </label>
              </div>
              <p className="text-left mb-1">Send silent notifications to iOS</p>
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="credentials">
                Credentials
              </Label>
              <input
                type="textarea"
                className="form-control textCustomClass mb-1"
                placeholder="credentials"
                name="credentials"
                ref={register({ required: true })}
              />
              <p className="address-subtitle text-center mb-1">
                The credentials as JSON document.
              </p>
              {errors.firstName && (
                <FormFeedback>Please enter a valid First Name</FormFeedback>
              )}
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
        list={firebaseResult}
        showDetails={onDiscard}
        onDelete={onDelete}
        useImport={false}

      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    fireBaseData: state.notificationFirebaseReducer,
    selectedRows: state.tableRowsReducer,
  }; // PROP!!!!! collectionList !!!
};

export default connect(mapStateToProps, {
  addFirebaseData,
  fetchFirebaseData,
  updateFirebaseData,
  deleteFirebaseData,
})(FirebaseCard);
