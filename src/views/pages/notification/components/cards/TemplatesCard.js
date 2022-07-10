// ** React Imports
import { Fragment, useState, useEffect } from "react";
import uuid from "react-uuid";

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
import { useForm } from "react-hook-form";
import { Home } from "react-feather";

// ** Utils
import Table from "../../../recommedition/components/Table";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

// ** REDUX
import { connect } from "react-redux";
import {
  addTemplateData,
  updateTemplateData,
  fetchNotificationTemplates,
  deleteTemplateData,
} from "../../../../../redux/actions/notificationTemplates";

import { fetchMessagingTemplates } from "../../../../../redux/actions/notificationMessagingTemplates";
import { fetchEmailTemplateData } from "../../../../../redux/actions/notificationEmailTemplates";

const TemplatesCard = ({
  messagingTemplatesList = [],
  emailTemplatesList = [],
  templateData = [],
  selectedRows = [],
  addTemplateData = () => {},
  updateTemplateData = () => {},
  fetchNotificationTemplates = () => {},
  deleteTemplateData = () => {},
}) => {
  // ** States
  const [show, setShow] = useState(false);
  const [currentTemplateDatas, setCurrentTemplateDatas] = useState([]);
  const [messagingListData, setMessagingTemplatesListData] = useState([]);
  const [emailTemplatesListData, setEmailTemplatesListData] = useState([]);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const current = templateData?.map((template) => {
      // Yeni eklenen obje yerine array içinde geliyor sıkıntı bu
      return {
        code: template?.code,
        created: template?.created,
        formatting: template.formatting?.subject?.en,
        lastUpdated: template?.lastUpdate,
      };
    });
    setCurrentTemplateDatas(current);
  }, [templateData, show]);

  useEffect(() => {
    fetchMessagingTemplates();
    fetchEmailTemplateData();
    fetchNotificationTemplates();
  }, []);

  useEffect(() => {
    setMessagingTemplatesListData(messagingTemplatesList);
    setEmailTemplatesListData(emailTemplatesList);
  }, [messagingTemplatesList, emailTemplatesList]);

  const onSubmit = (data) => {
    reset({});
    if (currentTemplateDatas.length > 0) {
      const currentTemplateData = currentTemplateDatas.find(
        (template) => template.code === data.code
      );
      if (currentTemplateData) {
        updateTemplateData(data);
      } else {
        addTemplateData(data);
      }
    } else {
      addTemplateData(data);
    }
  };

  const onDiscard = () => {
    setShow(true);
    const templateDataIndex = templateData.findIndex(
      (element) => element.code === selectedRows[0]?.code
    );
    if (selectedRows.length > 0) {
      console.log("templateData", templateData[templateDataIndex]);
      reset({
        code: templateData[templateDataIndex]?.code,
        subject: templateData[templateDataIndex].formatting?.subject?.en,
        body: templateData[templateDataIndex].formatting?.body?.en,
        linkUrl: templateData[templateDataIndex].formatting?.linkUrl?.en,
        linkText: templateData[templateDataIndex].formatting?.linkText?.en,
        confirmText:
          templateData[templateDataIndex].formatting?.confirmText?.en,
        confirmMode: templateData[templateDataIndex].formatting?.confirmMode,
        emailSend: templateData[templateDataIndex].settings?.email?.send,
        emailSec:
          templateData[templateDataIndex].settings?.email?.delayInSeconds,
        emailWhen: templateData[templateDataIndex].settings?.email?.condition,
        emailTemplates:
          templateData[templateDataIndex].settings?.email?.template,
        fromEmail:
          templateData[templateDataIndex].settings?.email?.properties
            ?.fromEmail,
        fromName:
          templateData[templateDataIndex].settings?.email?.properties?.fromName,
        messagingSend:
          templateData[templateDataIndex].settings?.messaging?.send,
        messagingSec:
          templateData[templateDataIndex].settings?.messaging?.delayInSeconds,
        messagingWhen:
          templateData[templateDataIndex].settings?.messaging?.condition,
        messagingTemplates:
          templateData[templateDataIndex].settings?.messaging?.template,
        templateMessaging: templateData[templateDataIndex]?.templateMessaging,
        // templateSms: templateData[templateDataIndex]?.templateSms,
        templateWebhook: templateData[templateDataIndex]?.templateWebhook,
        template: templateData[templateDataIndex]?.template,
      });
    }
  };

  const onDelete = () => {
    if (selectedRows.length > 1) {
      // BİRDEN FAZLA SEÇEMEZSİN
    } else {
      deleteTemplateData(selectedRows[0].code);
    }
  };

  const modalClose = () => {
    setShow(false);
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
      <Button
        color="primary"
        onClick={() => {
          setShow(true);
          reset({});
        }}
      >
        Create
      </Button>
      </Col>
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
          <h1 className="address-title text-center mb-1">New Template</h1>
          <Row
            tag="form"
            className="gy-1 gx-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12} md={12}>
              <Label className="form-label" for="code">
                Code
              </Label>
              <input
                type="text"
                className="form-control textCustomClass"
                id="code"
                name="code"
                ref={register({ required: true })}
              />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="subject">
                Subject
              </Label>
              <input
                type="text"
                className="form-control textCustomClass"
                id="subject"
                name="subject"
                ref={register({ required: true })}
              />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="body">
                Body
              </Label>
              <input
                type="textarea"
                className="form-control textCustomClass"
                id="body"
                name="body"
                ref={register({ required: true })}
              />
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="linkUrl">
                Link Url
              </Label>
              <input
                type="url"
                className="form-control textCustomClass mb-1"
                placeholder="linkUrl"
                name="linkUrl"
                ref={register({ required: true })}
              />
              <p className="address-subtitle text-center mb-1">
                The URL to open when the notification or link is clicked.
              </p>
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="linkText">
                Link Text
              </Label>
              <input
                type="text"
                className="form-control textCustomClass mb-1"
                placeholder="linkText"
                name="linkText"
                ref={register({ required: true })}
              />
              <p className="address-subtitle text-center mb-1">
                Set the text that will be shown when a link is rendered.
              </p>
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="confirmText">
                Confirm Text
              </Label>
              <input
                type="text"
                className="form-control textCustomClass mb-1"
                placeholder="confirmText"
                name="confirmText"
                ref={register({ required: true })}
              />
              <p className="address-subtitle text-center mb-1">
                Override the default text of the confirm button.
              </p>
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="confirmMode">
                Confirm Mode
              </Label>
              <select
                className="form-control textCustomClass mb-1"
                name="confirmMode"
                ref={register}
              >
                <option value="Explicit">Explicit</option>
                <option value="None">None</option>
              </select>
              <p className="address-subtitle text-center mb-1">
                In Explicit mode a button will be shown to confirm the
                notification.
              </p>
            </Col>
            <Col
              xs={12}
              md={{
                offset: 3,
                size: 6,
              }}
              className="text-center"
            >
              <Label className="form-label" for="confirmMode">
                RULES
              </Label>
              <hr />
            </Col>
            <Row>
              <Col xs={3} md={3}>
                <select
                  className="form-control textCustomClass mb-1"
                  name="emailSend"
                  ref={register}
                >
                  <option value="-">-</option>
                  <option value="Send">Send</option>
                  <option value="Do not Send">Do not Send</option>
                  <option value="Do not Allow">Do not Allow</option>
                </select>
              </Col>
              <Col xs={1} md={1} className="align-self-center">
                <p className="form-label text-left " for="confirmMode">
                  via Email
                </p>
              </Col>
              <Col xs={1} md={1} className="align-self-center">
                <p className="form-label text-left " for="confirmMode">
                  after
                </p>
              </Col>
              <Col xs={2} md={2}>
                <input
                  type="number"
                  className="form-control textCustomClass mb-1"
                  name="emailSec"
                  ref={register({ required: true })}
                />
              </Col>
              <Col xs={1} md={1} className="align-self-center p-0 w-50">
                <p className="form-label text-left w-50 " for="confirmMode">
                  sec.
                </p>
              </Col>
              <Col xs={1} md={1} className="align-self-center p-0">
                <p
                  className="form-label text-left p-0 text-center "
                  for="confirmMode"
                >
                  when
                </p>
              </Col>
              <Col xs={3} md={3}>
                <select
                  className="form-control textCustomClass mb-1"
                  name="emailWhen"
                  ref={register}
                >
                  <option value="-">-</option>
                  <option value="Always">Always</option>
                  <option value="Not Seen">Not Seen</option>
                  <option value="Not Confirmed">Not Confirmed</option>
                </select>
              </Col>
            </Row>

            <Row>
              <Col xs={3} md={3}>
                <select
                  className="form-control textCustomClass mb-1"
                  name="messagingSend"
                  ref={register}
                >
                  <option value="-">-</option>
                  <option value="Send">Send</option>
                  <option value="Do not Send">Do not Send</option>
                  <option value="Do not Allow">Do not Allow</option>
                </select>
              </Col>
              <Col xs={1} md={1} className="align-self-center">
                <p className="form-label text-left " for="confirmMode">
                  via Message
                </p>
              </Col>
              <Col xs={1} md={1} className="align-self-center">
                <p className="form-label text-left " for="confirmMode">
                  after
                </p>
              </Col>
              <Col xs={2} md={2}>
                <input
                  type="number"
                  className="form-control textCustomClass mb-1"
                  name="messagingSec"
                  ref={register({ required: true })}
                />
              </Col>
              <Col xs={1} md={1} className="align-self-center p-0 w-50">
                <p className="form-label text-left w-50 " for="confirmMode">
                  sec.
                </p>
              </Col>
              <Col xs={1} md={1} className="align-self-center p-0">
                <p
                  className="form-label text-left p-0 text-center "
                  for="confirmMode"
                >
                  when
                </p>
              </Col>
              <Col xs={3} md={3}>
                <select
                  className="form-control textCustomClass mb-1"
                  name="messagingWhen"
                  ref={register}
                >
                  <option value="-">-</option>
                  <option value="Send">Always</option>
                  <option value="Not Seen">Not Seen</option>
                  <option value="Not Confirmed">Not Confirmed</option>
                </select>
              </Col>
            </Row>
            <Col
              xs={12}
              md={{
                offset: 3,
                size: 6,
              }}
              className="text-center"
            >
              <Label className="form-label" for="confirmMode">
                EMAIL
              </Label>
              <hr />
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="template">
                Email Templates
              </Label>
              <select
                name="emailTemplates"
                ref={register}
                className="form-control textCustomClass mb-1"
              >
                <option value="" selected="selected">
                  Select an Option
                </option>
                {emailTemplatesListData.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <p className="address-subtitle text-center mb-1">
                Select the template for this channel. Only templates with a name
                will show up here. If no template is defined the primary
                template is used.
              </p>
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="fromEmail">
                From Email Address
              </Label>
              <input
                type="text"
                className="form-control textCustomClass mb-1"
                name="fromEmail"
                ref={register({ required: true })}
              />
              <p className="address-subtitle text-center mb-1">
                Override the from email address.
              </p>
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="fromName">
                From Name
              </Label>
              <input
                type="text"
                className="form-control textCustomClass mb-1"
                name="fromName"
                ref={register({ required: true })}
              />
              <p className="address-subtitle text-center mb-1">
                Override the from email name.
              </p>
            </Col>
            {/* <Col
              xs={12}
              md={{
                offset: 3,
                size: 6,
              }}
              className="text-center"
            >
              <Label className="form-label" for="messaging">
                MESSAGING
              </Label>
              <hr />
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="templateMessaging">
                Messaging Templates
              </Label>
              <input
                type="text"
                className="form-control textCustomClass mb-1"
                name="templateMessaging"
                ref={register({ required: true })}
              />
              <p className="address-subtitle text-center mb-1">
                Select the template for this channel. Only templates with a name
                will show up here. If no template is defined the primary
                template is used.
              </p>
            </Col> */}
            <Col
              xs={12}
              md={{
                offset: 3,
                size: 6,
              }}
              className="text-center"
            >
              <Label className="form-label" for="sms">
                Message
              </Label>
              <hr />
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="messagingTemplates">
                Messaging Template
              </Label>
              <select
                name="messagingTemplates"
                ref={register}
                className="form-control textCustomClass mb-1"
              >
                <option value="" selected="selected">
                  Select an Option
                </option>
                {messagingListData.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <p className="address-subtitle text-center mb-1">
                Select the template for this channel. Only templates with a name
                will show up here. If no template is defined the primary
                template is used.
              </p>
            </Col>
            <Col
              xs={12}
              md={{
                offset: 3,
                size: 6,
              }}
              className="text-center"
            ></Col>

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
        list={currentTemplateDatas}
        showDetails={onDiscard}
        onDelete={onDelete}
        useImport={false}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    templateData: state.notificationTemplatesReducer,
    selectedRows: state.tableRowsReducer,
    messagingTemplatesList: state.messagingTemplatesReducer,
    emailTemplatesList: state.notificationEmailTemplatesReducer,
  }; // PROP!!!!! collectionList !!!
};

export default connect(mapStateToProps, {
  addTemplateData,
  updateTemplateData,
  fetchNotificationTemplates,
  deleteTemplateData,
})(TemplatesCard);
