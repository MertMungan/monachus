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

// ** REACT HOOK FORM
import { useForm, Controller } from "react-hook-form";

// ** REDUX
import { connect } from "react-redux";
import {
  addUsersData,
  fetchUsersData,
  updateUsersData,
  deleteUsersData,
} from "../../../../redux/actions/notificationUsers";

import Table from "../../recommedition/components/Table";
import { toast } from "react-toastify";

const Users = ({
  usersData = [],
  selectedRows = [],
  addUsersData = () => {},
  fetchUsersData = () => {},
  updateUsersData = () => {},
  deleteUsersData = () => {},
}) => {
  const [show, setShow] = useState(false);
  const [tableDatas, setTableDatas] = useState([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(
    //   "tableData",
    //   tableDatas.find((template) => template.id === data.id)
    // );
    if (tableDatas.length > 0) {
      const tableData = tableDatas.find((user) => user.id === data.id);
      if (tableData) {
        // console.log("UPDATE");
        updateUsersData(data);
      } else {
        // console.log("ADD1");
        addUsersData(data);
      }
    } else {
      // console.log("ADD2");

      addUsersData(data);
    }
  };

  const onDiscard = () => {
    setShow(true);
    const userDataIndex = usersData.findIndex(
      (element) => element.id === selectedRows[0]?.id
    );
    if (selectedRows.length > 0) {
      reset({
        id: usersData[userDataIndex]?.id,
        name: usersData[userDataIndex]?.fullName,
        emailAddress: usersData[userDataIndex]?.emailAddress,
        phoneNumber: usersData[userDataIndex]?.phoneNumber,
      });
    }
  };

  const onDelete = () => {
    if (selectedRows.length === 1) {
      let id = selectedRows[0].id;
      deleteUsersData(id);
    } else {
      toast.error("Please select one row");
    }
  };
  useEffect(() => {
    fetchUsersData();
  }, []);

  useEffect(() => {
    const current = usersData?.map((user) => {
      return {
        id: user?.id,
        Name: user?.fullName,
        Email: user?.emailAddress,
        Created: user?.created,
        "Last Update": user?.lastUpdate,
      };
    });
    setTableDatas(current);
  }, [usersData]);

  const modalClose = () => {
    setShow(false);
  };

  return (
    <>
      <Button color="primary" onClick={() => setShow(true)}>
        + New User
      </Button>
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
          <Row
            tag="form"
            className="gy-1 gx-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12}>
              <Label className="form-label" for="id">
                Id
              </Label>
              <input
                type="text"
                className="form-control textCustomClass mb-1"
                name="id"
                ref={register({ required: true })}
              />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="name">
                Name
              </Label>
              <input
                type="text"
                className="form-control textCustomClass mb-1"
                name="name"
                ref={register({ required: true })}
              />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="emailAddress">
                Email Address
              </Label>
              <input
                type="email"
                className="form-control textCustomClass"
                name="emailAddress"
                ref={register({ required: true })}
              />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="phoneNumber">
                Phone Number
              </Label>
              <input
                //type="tel"
                type="number"
                className="form-control textCustomClass"
                name="phoneNumber"
                //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                ref={register({ required: true })}
              />
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
      list={tableDatas} 
      showDetails={onDiscard}
      onDelete={onDelete} 
      useImport={false}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    usersData: state.notificationUsersReducer,
    selectedRows: state.tableRowsReducer,
  }; // PROP!!!!! collectionList !!!
};

export default connect(mapStateToProps, {
  addUsersData,
  fetchUsersData,
  updateUsersData,
  deleteUsersData,
})(Users);
