// ** React Imports
import { Fragment, useState, useEffect } from "react";
import uuid from "react-uuid";
import { toast } from "react-toastify";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Label,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  FormFeedback,
} from "reactstrap";

// ** Third Party Components
import { useForm } from "react-hook-form";

import Table from "../../../recommedition/components/Table";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

// ** REDUX
import { connect } from "react-redux";
import {
  addTopicData,
  updateTopicData,
  fetchTopicData,
  deleteTopicData,
  addPublishData,
} from "../../../../../redux/actions/notificationTopic";

const TopicCard = ({
  topicData = [],
  usersData = [],
  templateData = [],
  emailData = [],
  smsData = [],
  selectedRows = [],
  addTopicData = () => {},
  updateTopicData = () => {},
  fetchTopicData = () => {},
  deleteTopicData = () => {},
  addPublishData = () => {},
}) => {
  // ** States
  const [show, setShow] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [currentTopicDatas, setCurrentTopicDatas] = useState([]);
  const [currentUsersData, setCurrentUsersData] = useState([]);
  const [currentTemplatesData, setCurrentTemplatesData] = useState([]);
  const [currentEmailData, setCurrentEmailData] = useState([]);
  const [currentSmsData, setCurrentSmsData] = useState([]);
  useEffect(() => {
    const current = topicData.map((topic) => {
      return {
        path: topic.path,
        name: topic.name?.en,
        description: topic.description?.en,
        email: topic.channels?.email,
        sms: topic.channels?.sms,
        messaging: topic.channels?.messaging,
        mobilePush: topic.channels?.mobilePush,
        webPush: topic.channels?.webPush,
        webhook: topic.channels?.webhook,
      };
    });
    setCurrentTopicDatas(current);
  }, [topicData]);

  useEffect(() => {
    if (usersData.length > 0) {
      const currentIds = usersData.map((user) => {
        return {
          id: user.id,
        };
      });
      setCurrentUsersData(currentIds);
    }
  }, [usersData]);

  useEffect(() => {
    if (templateData.length > 0) {
      const currentTemplateCodes = templateData.map((template) => {
        return {
          code: template.code,
        };
      });
      setCurrentTemplatesData(currentTemplateCodes);
    }
  }, [templateData]);

  useEffect(() => {
    if (emailData.length > 0) {
      // console.log("emailData", emailData);
      const currentEmailNames = emailData.map((email) => {
        return {
          id: email.id,
          name: email.name,
        };
      });
      setCurrentEmailData(currentEmailNames);
    }
  }, [emailData]);

  useEffect(() => {
    if (smsData.length > 0) {
      // console.log("smsData", smsData);
      const currentSmsNames = smsData.map((sms) => {
        return {
          name: sms.name,
          id: sms.id,
        };
      });
      setCurrentSmsData(currentSmsNames);
    }
  }, [smsData]);
  useEffect(() => {
    fetchTopicData();
  }, []);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerPublish,
    reset: resetPublish,
    handleSubmit: handleSubmitPublish,
    formState: { errors: errorsPublish },
  } = useForm();
  const onSubmit = (data) => {
    // console.log("onSubmit", data);
    if (currentTopicDatas.length > 0) {
      // console.log("currentTopicDatas", currentTopicDatas);
      let found = currentTopicDatas.find((t) => t.path === data.topicName);
      if (found) {
        updateTopicData(data);
      } else {
        addTopicData(data);
      }
    } else {
      addTopicData(data);
    }
  };

  const onSubmitPublish = (data) => {
    if (data.topicTemplateSelect?.length > 0) {
      let found = templateData.find((t) => t.code === data.topicTemplateSelect);
      // console.log("found", found);
      if (found) {
        let dataToSend = {
          topicUserSelect: data.topicUserSelect,
          body: data.body !== "" ? data.body : found.formatting?.body.en,
          confirmMode: data.confirmMode
            ? data.confirmMode
            : found.formatting?.confirmMode,
          confirmText:
            data.confirmText !== ""
              ? data.confirmText
              : found.formatting?.confirmText?.en,
          data: data.data,
          emailSec:
            data.emailSec !== ""
              ? data.emailSec
              : found.settings?.email?.delayInSeconds,
          emailSend:
            data.emailSec !== "" ? data.emailSend : found.settings?.email?.send,
          emailWhen:
            data.emailWhen !== ""
              ? data.emailWhen
              : found.settings?.email?.condition,
          linkText:
            data.linkText !== ""
              ? data.linkText
              : found.formatting?.linkText?.en,
          linkUrl:
            data.linkUrl !== "" ? data.linkUrl : found.formatting?.linkUrl?.en,
          liveInSeconds: data.liveInSeconds,
          publishEmailAdress:
            data.publishEmailAdress !== ""
              ? data.publishEmailAdress
              : found.settings?.email?.properties?.fromEmail,
          publishEmailName:
            data.publishEmailName !== ""
              ? data.publishEmailName
              : found.settings?.email?.properties?.fromName,
          silent: data.silent,
          smsSec:
            data.smsSec !== ""
              ? data.smsSec
              : found.settings?.sms?.delayInSeconds,
          smsSend:
            data.smsSec !== "" ? data.smsSend : found.settings?.sms?.send,
          smsWhen:
            data.smsWhen !== "" ? data.smsWhen : found.settings?.sms?.condition,
          subject:
            data.subject !== "" ? data.subject : found.formatting?.subject?.en,
          testMode: data.testMode,
          topicEmailSelect: data.topicEmailSelect,
          topicSmsSelect: data.topicSmsSelect,
          topicTemplateSelect: data.topicTemplateSelect,
        };
        addPublishData(dataToSend);
        // console.log("template data yok ve dataToSend action'a yollandı");
      } else {
        addPublishData(data);

        // console.log("template data yok ve data action'a yollandı");
      }
    } else {
      addPublishData(data);
      // console.log("data action'a yollandı");
    }
  };

  const onDetails = () => {
    // console.log("dededed", selectedRows[0])

    if (selectedRows.length > 0) {
      setShow(true);
      reset({
        topicName: selectedRows[0]?.path,
        name: selectedRows[0]?.name,
        description: selectedRows[0]?.description,
        email: selectedRows[0]?.email,
        messaging: selectedRows[0]?.messaging,
        mobilePush: selectedRows[0]?.mobilePush,
        sms: selectedRows[0]?.sms,
        webPush: selectedRows[0]?.webPush,
        webHook: selectedRows[0]?.webHook,

      });
    }
  };
  const modalClose = () => {
    setShow(false);
    setShowPublishModal(false);
  };

  const onDiscard = () => {
    // console.log("dededed", selectedRows[0]?.path)
    reset({
      topicName: selectedRows[0]?.path,
    });
  }

  const handleNewTopic = () => {
    setShowPublishModal(false);
    setShow(true);
    reset({});
  };

  const handlePublish = () => {
    setShow(false);
    setShowPublishModal(true);
    resetPublish({});
  };

  const handleTopicDelete = () => {
    // console.log("selectedRows", selectedRows);
    if (selectedRows.length === 1) {
      let path = selectedRows[0].path;
      deleteTopicData(path);
    } else {
      toast.error("Please select one row");
    }
  };
  return (
    <Fragment>
      <Col className="p-0">
        <Button
          color="primary"
          className="mr-1"
          onClick={() => handleNewTopic()}
        >
          + New Topic
        </Button>
        <Button color="primary" onClick={() => handlePublish()}>
          Publish
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
          <h1 className="address-title text-center mb-1">New Topic</h1>
          <Row
            tag="form"
            className="gy-1 gx-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xs={12} md={12}>
              <Label className="form-label" for="topicName">
                Topic Name
              </Label>
              <input
                type="text"
                className="form-control textCustomClass mb-1"
                placeholder="Topic name"
                name="topicName"
                ref={register({ required: true })}
              />
              {errors.firstName && (
                <FormFeedback>Please enter a valid First Name</FormFeedback>
              )}
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="name">
                Name
              </Label>
              <input
                type="text"
                className="form-control textCustomClass mb-1"
                placeholder="Name"
                name="name"
                ref={register({ required: true })}
              />
              {errors.firstName && (
                <FormFeedback>Please enter a valid First Name</FormFeedback>
              )}
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="description">
                Description
              </Label>
              <input
                type="textarea"
                className="form-control textCustomClass mb-1"
                placeholder="Description"
                name="description"
                ref={register({ required: true })}
              />
            </Col>
            <Col xs={12}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="showAuto"
                  id="showAuto"
                  data-toggle="toggle"
                  ref={register({})}
                />
                <label className="custom-control-label" htmlFor="showAuto">
                  Show automatically
                </label>
              </div>
              <p className="text-left mb-1">
                Ask the user to subscribe when he uses the frontend the first
                time.
              </p>
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
              <Label className="form-label" for="email">
                Email
              </Label>
              <select
                name="email"
                className="form-control textCustomClass mb-1"
                ref={register}
              >
                <option value="Allowed">Allowed</option>
                <option value="NotAllowed">NotAllowed</option>
              </select>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="messaging">
                Messaging
              </Label>
              <select
                name="messaging"
                className="form-control textCustomClass mb-1"
                ref={register}
              >
                <option value="Allowed">Allowed</option>
                <option value="NotAllowed">NotAllowed</option>
              </select>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="mobilePush">
                Mobile Push
              </Label>
              <select
                name="mobilePush"
                className="form-control textCustomClass mb-1"
                ref={register}
              >
                <option value="Allowed">Allowed</option>
                <option value="NotAllowed">NotAllowed</option>
              </select>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="sms">
                SMS
              </Label>
              <select
                name="sms"
                className="form-control textCustomClass mb-1"
                ref={register}
              >
                <option value="Allowed">Allowed</option>
                <option value="NotAllowed">NotAllowed</option>
              </select>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="webPush">
                Web Push
              </Label>
              <select
                name="webPush"
                className="form-control textCustomClass mb-1"
                ref={register}
              >
                <option value="Allowed">Allowed</option>
                <option value="NotAllowed">NotAllowed</option>
              </select>
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="webhook">
                Webhook
              </Label>
              <select
                name="webhook"
                className="form-control textCustomClass mb-1"
                ref={register}
              >
                <option value="Allowed">Allowed</option>
                <option value="NotAllowed">NotAllowed</option>
              </select>
            </Col>
            <Col className="text-center" xs={12}>
              <Button type="submit" className="me-1 mt-2 mr-1" color="primary">
                Submit
              </Button>
              <Button
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

      <Modal
        isOpen={showPublishModal}
        onClosed={modalClose}
        toggle={() => setShowPublishModal(!showPublishModal)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShowPublishModal(!showPublishModal)}
        ></ModalHeader>
        <ModalBody className="pb-5 px-sm-4">
          <h1 className="address-title text-center mb-1">Publish</h1>
          <Row
            tag="form"
            className="gy-1 gx-2"
            onSubmit={handleSubmitPublish(onSubmitPublish)}
          >
            <Col xs={12} md={12}>
              <Label className="form-label" for="topicUserSelect">
                Topic
              </Label>
              <select
                name="topicUserSelect"
                ref={registerPublish}
                className="form-control textCustomClass mb-1"
              >
                <>
                  {currentUsersData.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.id}
                    </option>
                  ))}
                </>
              </select>
            </Col>

            <Col xs={12} md={12}>
              <>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    id="useTemplate"
                    name="useTemplate"
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="custom-control-input"
                  />
                  <label className="custom-control-label" htmlFor="useTemplate">
                    Use Template
                  </label>
                </div>
                {showTemplates && (
                  <>
                    <select
                      name="topicTemplateSelect"
                      ref={registerPublish}
                      className="form-control textCustomClass mb-1"
                    >
                      <>
                        {currentTemplatesData.map((template) => (
                          <option key={template.code} value={template.code}>
                            {template.code}
                          </option>
                        ))}
                      </>
                    </select>
                  </>
                )}
              </>
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
                ref={registerPublish}
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
                ref={registerPublish}
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
                ref={registerPublish}
              />
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
                ref={registerPublish}
              />
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
                ref={registerPublish}
              />
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="confirmMode">
                Confirm Mode
              </Label>
              <select
                className="form-control textCustomClass mb-1"
                name="confirmMode"
                ref={registerPublish}
              >
                <option value="Explicit">Explicit</option>
                <option value="None">None</option>
              </select>
            </Col>
            <Col xs={12} md={12}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="testMode"
                  id="testMode"
                  data-toggle="toggle"
                  ref={registerPublish({})}
                />
                <label className="custom-control-label" htmlFor="testMode">
                  Test Mode
                </label>
              </div>
            </Col>
            <Col xs={12} md={12}>
              <div className="custom-control custom-switch mt-1">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="silent"
                  id="silent"
                  data-toggle="toggle"
                  ref={registerPublish({})}
                />
                <label className="custom-control-label" htmlFor="silent">
                  Silent
                </label>
              </div>
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label mt-1" for="data">
                Data
              </Label>
              <input
                type="textarea"
                className="form-control textCustomClass mb-1"
                id="data"
                name="data"
                ref={registerPublish}
              />
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="liveInSeconds">
                Time to live in seconds
              </Label>
              <input
                type="number"
                className="form-control textCustomClass mb-1"
                id="liveInSeconds"
                name="liveInSeconds"
                ref={registerPublish}
              />
            </Col>
            <hr />
            <Col xs={12} md={12}>
              <Label className="form-label" for="liveInSeconds">
                Rules
              </Label>
            </Col>
            <Col xs={3} md={3}>
              <select
                className="form-control textCustomClass mb-1"
                name="emailSend"
                ref={registerPublish}
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
                ref={registerPublish}
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
                ref={registerPublish}
              >
                <option value="-">-</option>
                <option value="Always">Always</option>
                <option value="Not Seen">Not Seen</option>
                <option value="Not Confirmed">Not Confirmed</option>
              </select>
            </Col>
            <Col xs={3} md={3}>
              <select
                className="form-control textCustomClass mb-1"
                name="smsSend"
                ref={registerPublish}
              >
                <option value="-">-</option>
                <option value="Send">Send</option>
                <option value="Do not Send">Do not Send</option>
                <option value="Do not Allow">Do not Allow</option>
              </select>
            </Col>
            <Col xs={1} md={1} className="align-self-center">
              <p className="form-label text-left " for="confirmMode">
                via SMS
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
                name="smsSec"
                ref={registerPublish}
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
                name="smsWhen"
                ref={registerPublish}
              >
                <option value="-">-</option>
                <option value="Send">Always</option>
                <option value="Not Seen">Not Seen</option>
                <option value="Not Confirmed">Not Confirmed</option>
              </select>
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="topicEmailSelect">
                Template
              </Label>
              <select
                name="topicEmailSelect"
                ref={registerPublish}
                className="form-control textCustomClass mb-1"
              >
                <>
                  {currentEmailData.map((user) => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </>
              </select>
              <Label className="form-label" for="publishEmailAdress">
                From Email Adress
              </Label>
              <input
                type="email"
                className="form-control textCustomClass mb-1"
                name="publishEmailAdress"
                ref={registerPublish}
              />
              <Label className="form-label" for="publishEmailName">
                From Name
              </Label>
              <input
                type="text"
                className="form-control textCustomClass mb-1"
                name="publishEmailName"
                ref={registerPublish}
              />
            </Col>
            <Col xs={12} md={12}>
              <Label className="form-label" for="topicSmsSelect">
                Template
              </Label>
              <select
                name="topicSmsSelect"
                ref={registerPublish}
                className="form-control textCustomClass mb-1"
              >
                <>
                  {currentSmsData.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </>
              </select>
            </Col>
            <Col className="text-center" xs={12}>
              <Button type="submit" className="me-1 mt-2 mr-1" color="primary">
                Submit
              </Button>
              <Button
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
        list={currentTopicDatas}
        showDetails={onDetails}
        onDelete={handleTopicDelete}
        useImport={false}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    topicData: state.notificationTopicReducer,
    selectedRows: state.tableRowsReducer,
    usersData: state.notificationUsersReducer,
    templateData: state.notificationTemplatesReducer,
    emailData: state.notificationEmailTemplatesReducer,
    smsData: state.messagingTemplatesReducer,
  }; // PROP!!!!! collectionList !!!
};

export default connect(mapStateToProps, {
  addTopicData,
  updateTopicData,
  fetchTopicData,
  deleteTopicData,
  addPublishData,
})(TopicCard);
