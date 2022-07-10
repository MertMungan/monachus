// ** React Imports
import { Fragment, useState, useEffect, useRef } from "react";
import { MoreVertical } from "react-feather";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Modal,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import { useForm } from "react-hook-form";
import { Home } from "react-feather";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

// ** REDUX
import { connect } from "react-redux";
import {
  addMessagingTemplates,
  deleteMessagingTemplates,
  fetchMessagingTemplates,
  updateMessagingTemplates,
} from "../../../../../redux/actions/notificationMessagingTemplates";
import uuid from "react-uuid";

const MessagingTemplates = ({
  smsData = [],
  addMessagingTemplates = () => {},
  fetchMessagingTemplates = () => {},
  updateMessagingTemplates = () => {},
  deleteMessagingTemplates = () => {},
}) => {
  // ** States
  const [show, setShow] = useState(false);
  const [smsCards, setSmsCards] = useState([]);
  const [removeId, setRemoveId] = useState("");
  const [cardId, setCardId] = useState("");

  useEffect(() => {
    fetchMessagingTemplates();
  }, []);

  useEffect(() => {
    setSmsCards(smsData);
  }, [smsData]);
  const handleCardCreation = () => {
    /*      const card = (
    <Card>
        <CardHeader>
          <CardTitle tag="h4">-Unnamed-</CardTitle>
          <UncontrolledDropdown className="chart-dropdown">
            <DropdownToggle
              color=""
              className="bg-transparent btn-sm border-0 "
            >
              <MoreVertical size={18} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                className="w-100"
                onClick={() => {
                  setRemoveId(cardId);
                }}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </CardHeader>
      </Card>
    );
    const cardObject = {
      name: "-Unnamed-",
      createdTime: new Date().toLocaleString(),
      primary: false,
      templates: {},
      element: card,
    };
    console.log("cardObject", cardObject); */
    addMessagingTemplates();
    /*     setSmsCards([...smsCards, cardObject]);
     */
  };

  const handleDelete = (id) => {
    deleteMessagingTemplates(id);
  };
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const updatedCardObject = {
      name: data.name,
      primary: data.primaryEnable,
      templates: data.credentials,
    };
    updateMessagingTemplates(cardId, updatedCardObject);
  };

  const onDiscard = () => {
    // clearErrors()
    setShow(false);
    // reset()
  };

  return (
    <Fragment>
      <Col
      className= "pl-2"
      sm={{
        offset: 10,
        size: '0'
      }}
      >
      <Button color="primary" onClick={handleCardCreation} className="mb-2">
        Create
      </Button>
      </Col>
      {smsCards.length > 0 && (
        <Fragment>
          <Row
            className="p-0 w-100 align-items-start justify-content-center"
            sm={{
              offset: 0,
              size: 7,
            }}
            md={{
              offset: 0,
              size: 9,
            }}
          >
            {smsCards.map((card) => (
              <Fragment>
                <Card className="p-0 w-25 mr-1">
                  <CardTitle
                    className="p-0 w-100 mt-1 text-center"
                    tag="h4"
                    key={card.id}
                  >
                    {card.name === null ? "Unnamed" : card.name}
                  </CardTitle>
                  <CardBody style={{ alignSelf: "center", display: "flex" }}>
                    <Button
                      className="mr-1"
                      color="primary"
                      onClick={() => {
                        reset({
                          name: card.name,
                          primaryEnable: card.primaryEnable,
                          credentials: card.templates,
                        });
                        setShow(true);
                        setCardId(card.id);
                      }}
                    >
                      Details
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        handleDelete(card.id);
                      }}
                    >
                      Delete
                    </Button>
                  </CardBody>
                </Card>
              </Fragment>
            ))}
          </Row>
        </Fragment>
      )}

      <Modal
        isOpen={show}
        onClosed={onDiscard}
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
            <Col xs={12} md={12}>
              <Label className="form-label" for="name">
                Name
              </Label>
              <input
                type="text"
                className="form-control textCustomClass"
                id="name"
                name="name"
                ref={register({ required: true })}
              />
            </Col>

            <Col xs={12}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="primaryEnable"
                  id="primaryEnable"
                  data-toggle="toggle"
                  ref={register({})}
                />
                <label className="custom-control-label" htmlFor="primaryEnable">
                  Primary
                </label>
              </div>
            </Col>

            <Col xs={12} md={12}>
              <Label className="form-label" for="credentials">
                Templates
              </Label>
              <input
                type="textarea"
                className="form-control textCustomClass mb-1"
                placeholder="{{notification.subject}}"
                name="credentials"
                ref={register({ required: true })}
              />
            </Col>
            <Col className="text-center" xs={12}>
              <Button type="submit" className="me-1 mt-2" color="primary">
                Submit
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { smsData: state.messagingTemplatesReducer }; // PROP!!!!! collectionList !!!
};

export default connect(mapStateToProps, {
  addMessagingTemplates,
  fetchMessagingTemplates,
  updateMessagingTemplates,
  deleteMessagingTemplates,
})(MessagingTemplates);
