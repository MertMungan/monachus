import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import {
  Button,
  Row,
  Col,
  Modal,
  CardText,
  ModalBody,
  ModalHeader,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";
import AppCollapse from "@components/app-collapse";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import {
  addEmailTemplateData,
  updateEmailTemplateData,
  fetchEmailTemplateData,
} from "../../../../../redux/actions/notificationEmailTemplates";

const EmailTemplate = ({
  emailTemplatesData = [],
  addEmailTemplateData = () => {},
  updateEmailTemplateData = () => {},
  fetchEmailTemplateData = () => {},
}) => {
  const [open, setOpen] = useState("");
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchEmailTemplateData();
  }, []);

  useEffect(() => {
    setEmailTemplates(emailTemplatesData);
  }, [emailTemplatesData]);

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggle = (id) => {
    open === id ? setOpen() : setOpen(id);
  };

  const handleCardCreation = (titleData) => {
    let cardId = uuid();
    let objId = uuid();

    const card = (
      <>
        <CardText className="mb-0">
          Icing sweet roll cotton candy brownie candy canes candy canes. Pie
          jelly dragée pie. Ice cream jujubes wafer. Wafer croissant carrot cake
          wafer gummies gummies chupa chups halvah bonbon. Gummi bears cotton
          candy jelly-o halvah. Macaroon apple pie dragée bonbon marzipan
          cheesecake. Jelly jelly beans marshmallow.
        </CardText>
      </>
    );
    const cardObject = {
      title: titleData,
      content: card,
    };
    // console.log("cardObject", cardObject);
    setSmsCards([...smsCards, cardObject]);
  };
  const onDiscard = () => {
    // clearErrors()
    setShow(false);
    // reset()
  };
  const onSubmit = (data) => {
    // if input field called condition is empty, we will addEmailTemplateData, else updateEmailTemplateData

    if (document.getElementById("condition").value !== data.condition) {
      addEmailTemplateData(data);
    } else {
      updateEmailTemplateData(data, id);
    }
  };

  return (
    <>
    <Col
    className= "pl-3"
    sm={{
      offset: 10,
      size: '0'
    }}
    >
      <Button color="primary" className="mb-2" onClick={() => setShow(true)}>
        Create
      </Button>
      </Col>
      {emailTemplates.length > 0 && (
        <>
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
            {emailTemplates.map((card) => (
              <>
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
                      className="w-50 mr-1"
                      color="primary"
                      onClick={() => {
                        reset({
                          condition: card.name,
                        });
                        setShow(true);
                        setId(card.id);
                      }}
                    >
                      Details
                    </Button>
                    <Button
                      className="w-50"
                      color="primary"
                      onClick={() => {
                        handleDelete(card.id);
                      }}
                    >
                      Delete
                    </Button>
                  </CardBody>
                </Card>
                <br />
              </>
            ))}
          </Row>
        </>
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
            <input
              type="text"
              className="form-control textCustomClass"
              id="condition"
              name="condition"
              ref={register({ required: true })}
            />
            <Button type="submit" className="me-1 mt-2" color="primary">
              Submit
            </Button>
          </Row>
        </ModalBody>
      </Modal>
      {/* <AppCollapse data={emailTemplates} type="margin" accordion /> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return { emailTemplatesData: state.notificationEmailTemplatesReducer }; // PROP!!!!! collectionList !!!
};

export default connect(mapStateToProps, {
  addEmailTemplateData,
  updateEmailTemplateData,
  fetchEmailTemplateData,
})(EmailTemplate);
