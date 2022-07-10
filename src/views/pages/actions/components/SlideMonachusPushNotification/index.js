import React, { useState, useEffect } from "react";
import { Row, Col, Label, Button } from "reactstrap";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useSkin } from "@hooks/useSkin";
import { updateJourney } from "../../../../../redux/actions/journey";
import { fetchMessagingTemplates } from "../../../../../redux/actions/notificationMessagingTemplates";
import { fetchFirebaseData } from "../../../../../redux/actions/notificationFirebase";
let currentSkin = "dark";
const SlideMonachusPushNotification = ({
  messagingData = [],
  firebaseData = [],
  fetchMessagingTemplates = () => {},
  fetchFirebaseData = () => {},
  updateJourney = () => {},
  selectedBlockType = "",
  selectedBlockId = "",
  graphNodes = [],
  journeyOptions = {},
}) => {
  const [currentMessagingData, setCurrentMessagingData] = useState([]);
  const [currentFirebaseData, setCurrentFirebaseData] = useState([]);
  const [skin, setSkin] = useSkin();
  // console.log("selectedBlockType EMAIL", selectedBlockType);
  // console.log("selectedBlockId EMAIL", selectedBlockId);
  currentSkin = skin;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (messagingData.length > 0) {
      // console.log("messagingData", messagingData);
      const currentMessagingNames = messagingData.map((message) => {
        return {
          id: message.id,
          name: message.name,
        };
      });
      setCurrentMessagingData(currentMessagingNames);
    }
  }, [messagingData]);

  useEffect(() => {
    if (firebaseData.configured) {
      // first from smtpData.configured, get all the properties that has the type "SMTP"
      const currentFirebaseObjects = Object.values(firebaseData.configured)
        .filter((firebase) => firebase.type === "Firebase")
        .map((firebase) => {
          return {
            id: Object.keys(firebaseData.configured).find(
              (key) => firebaseData.configured[key] === firebase
            ),
            projectId: firebase.properties.projectId,
            credentials: firebase.properties.credentials,
            condition: firebase.condition,
          };
        });

      // console.log("currentFirebaseObjects", currentFirebaseObjects);
      setCurrentFirebaseData(currentFirebaseObjects);
    }
  }, [firebaseData]);

  useEffect(() => {
    fetchMessagingTemplates();
    fetchFirebaseData();
  }, []);

  // console.log("graphNodes", graphNodes);
  const onSubmit = (data) => {
    // console.log("data", data);
    // find the node with the id of the selected block
    const targetNode = graphNodes.find((node) => {
      return node.id === selectedBlockId;
    });
    // add config property to targetNode
    targetNode.config = {
      messaging: data.journeyMessagingSelect,
      firebase: data.journeyFirebaseSelect,
      name: data.journeyName,
      primary: data.primaryEnable,
      template: data.templates,
    };
    // console.log("targetNode", targetNode);
    updateJourney(targetNode, graphNodes);
  };
  return (
    <Row
      tag="form"
      className="gy-1 gx-2 m-0"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        backgroundColor: skin === "dark" ? "#161d31" : "#f8f8f8",
      }}
    >
      <Col xs={12} md={12}>
        <Label className="form-label" for="journeyMessagingSelect">
          Messaging Integration
        </Label>
        <select
          name="journeyMessagingSelect"
          ref={register}
          className="form-control textCustomClass mb-1"
        >
          <>
            {currentMessagingData.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </>
        </select>
        <Label className="form-label" for="journeyFirebaseSelect">
          Firebase Integration
        </Label>
        <select
          name="journeyFirebaseSelect"
          ref={register}
          className="form-control textCustomClass mb-1"
        >
          <>
            {currentFirebaseData.map((user) => (
              <option key={user.id} value={user.id}>
                {user.id} - {user.projectId} - {user.credentials}
              </option>
            ))}
          </>
        </select>
        <Label className="form-label" for="journeyName">
          Name
        </Label>
        <input
          type="text"
          className="form-control textCustomClass"
          id="journeyName"
          name="journeyName"
          ref={register({ required: true })}
        />

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

        <Label className="form-label" for="templates">
          Templates
        </Label>
        <input
          type="textarea"
          className="form-control textCustomClass mb-1"
          placeholder="{{notification.subject}}"
          name="templates"
          ref={register({ required: true })}
        />
      </Col>
      <Col
        xs={12}
        md={12}
        className="
        d-flex justify-content-center
      "
      >
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    messagingData: state.messagingTemplatesReducer,
    firebaseData: state.notificationFirebaseReducer,
  }; // PROP!!!!! collectionList !!!
};
export default connect(mapStateToProps, {
  fetchMessagingTemplates,
  fetchFirebaseData,
  updateJourney,
})(SlideMonachusPushNotification);
