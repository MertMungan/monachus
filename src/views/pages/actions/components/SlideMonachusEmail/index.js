import React, { useState, useEffect } from "react";
import { Row, Col, Label, Button } from "reactstrap";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useSkin } from "@hooks/useSkin";
import { fetchEmailTemplateData } from "../../../../../redux/actions/notificationEmailTemplates";
import { fetchSmtpData } from "../../../../../redux/actions/notificationSmtp";
import { updateJourney } from "../../../../../redux/actions/journey";
import { fetchJourneyOptions } from "../../../../../redux/actions/journeyOptions";
let currentSkin = "dark";
const SlideMonachusEmail = ({
  emailData = [],
  smtpData = [],
  fetchEmailTemplateData = () => {},
  fetchSmtpData = () => {},
  updateJourney = () => {},
  selectedBlockType = "",
  selectedBlockId = "",
  graphNodes = [],
  journeyOptions = [],
  selectedJourneyOptionId = "",
}) => {
  const [currentEmailData, setCurrentEmailData] = useState([]);
  const [currentSmtpData, setCurrentSmtpData] = useState([]);
  const [journeyOpts, setJourneyOpts] = useState([]);
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
    if (smtpData.configured) {
      // console.log("smtpData", smtpData.configured);
      // first from smtpData.configured, get all the properties that has the type "SMTP"

      const currentSmtpObjects = Object.values(smtpData.configured)
        .filter((smtp) => smtp.type === "SMTP")
        .map((smtp) => {
          // console.log("smtp", smtp);
          return {
            id: Object.keys(smtpData.configured).find(
              (key) => smtpData.configured[key] === smtp
            ),
            username: smtp.properties.username,
            host: smtp.properties.host,
            port: smtp.properties.port,
          };
        });
      // console.log("currentSmtpObjects", currentSmtpObjects);
      setCurrentSmtpData(currentSmtpObjects);
    }
  }, [smtpData]);

  useEffect(() => {
    fetchEmailTemplateData();
    fetchSmtpData();
    fetchJourneyOptions();
  }, []);

  useEffect(() => {
    setJourneyOpts(journeyOptions);
  }, [journeyOptions]);
  // console.log("selectedJourneyOptionId", selectedJourneyOptionId);
  // console.log("graphNodes", graphNodes);
  const onSubmit = (data) => {
    if (journeyOptions.length > 0) {
      if (
        selectedJourneyOptionId !== undefined &&
        selectedJourneyOptionId !== ""
      ) {
        const targetJourneyOption = journeyOpts.find(
          (journeyOption) => journeyOption.id === selectedJourneyOptionId
        );

        if (targetJourneyOption !== undefined && targetJourneyOption !== null) {
          const targetNode = targetJourneyOption.nodes.find(
            (node) => node.id === selectedBlockId
          );
          // console.log("targetNode", targetNode);

          targetNode.config = {
            emailSelect: data.JourneyEmailSelect,
            smtpSelect: data.journeySmtpSelect,
            emailAddress: data.journeyEmailAddress,
            emailName: data.journeyEmailName,
          };
          updateJourney(targetNode, targetJourneyOption.nodes);
        } else {
          // console.log("on submit targetJourneyOption is undefined");
        }
      } else {
        const targetNode = graphNodes.find(
          (node) => node.id === selectedBlockId
        );
        targetNode.config = {
          emailSelect: data.JourneyEmailSelect,
          smtpSelect: data.journeySmtpSelect,
          emailAddress: data.journeyEmailAddress,
          emailName: data.journeyEmailName,
        };
        updateJourney(targetNode, graphNodes);
      }
    } else {
      const targetNode = graphNodes.find((node) => {
        return node.id === selectedBlockId;
      });
      // add config property to targetNode
      targetNode.config = {
        emailSelect: data.JourneyEmailSelect,
        smtpSelect: data.journeySmtpSelect,
        emailAddress: data.journeyEmailAddress,
        emailName: data.journeyEmailName,
      };
      // console.log(" on submit targetNode", targetNode);
      updateJourney(targetNode, graphNodes);
    }
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
        <Label className="form-label" for="JourneyEmailSelect">
          Email Integration
        </Label>
        <select
          name="JourneyEmailSelect"
          ref={register}
          className="form-control textCustomClass mb-1"
        >
          <>
            {currentEmailData.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </>
        </select>
        <Label className="form-label" for="journeySmtpSelect">
          SMTP Integration
        </Label>
        <select
          name="journeySmtpSelect"
          ref={register}
          className="form-control textCustomClass mb-1"
        >
          <>
            {currentSmtpData.map((user) => (
              <option key={user.username} value={user.id}>
                SMTP://{user.username}@{user.host}:{user.port}
              </option>
            ))}
          </>
        </select>
        <Label className="form-label" for="journeyEmailAddress">
          From Email Adress
        </Label>
        <input
          type="email"
          className="form-control textCustomClass mb-1"
          name="journeyEmailAddress"
          ref={register}
        />
        <Label className="form-label" for="journeyEmailName">
          From Name
        </Label>
        <input
          type="text"
          className="form-control textCustomClass mb-1"
          name="journeyEmailName"
          ref={register}
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
    emailData: state.notificationEmailTemplatesReducer,
    smtpData: state.notificationSmtpReducer,
    journeyOptions: state.journeyOptionsReducer,
  }; // PROP!!!!! collectionList !!!
};
export default connect(mapStateToProps, {
  fetchEmailTemplateData,
  fetchSmtpData,
  updateJourney,
})(SlideMonachusEmail);
