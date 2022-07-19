import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import EventTable from "./EventTable";
import Wizard from "@components/wizard";
import FactsetName from "./steps/factsetName";
import FactsetDescription from "./steps/factsetDescription";
import AddFact from "./steps/addFacts";
import { Link } from "react-router-dom";
import BreadCrumbs from "@components/breadcrumbs";

import {
  Card,
  Row,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import uuid from "react-uuid";

// REDUX
import { connect } from "react-redux";
import {
  fetchEvents,
  addEvents,
  updateEvents,
  deleteEvents,
} from "../../../redux/actions/events/index";
// REDUX

function FactBuilder(props) {
  const { eventList, addEvents, fetchEvents, deleteEvents, updateEvents } =
    props;
  const [stepper, setStepper] = useState(null);
  const [currentFieldData, setCurrentFieldData] = useState([]);
  const [factInfo, setFactInfo] = useState({
    eventId: "",
    eventName: "",
    eventDescription: "",
    eventCategory: "",
    fields: [],
  });
  const [resetInfo, setResetInfo] = useState({
    eventId: "",
    eventName: "",
    eventDescription: "",
    eventCategory: "",
    fields: [],
  });
  const [wizardOpen, setWizardOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [showFieldsTable, setShowFieldsTable] = useState(false);
  const [resetEvent, setResetEvent] = useState({});
  const seteventName = (name) => {
    if (selectedEvent) {
      setFactInfo({
        eventId: selectedEvent.eventId,
        eventName: name,
        eventDescription: selectedEvent.eventDescription,
        eventCategory: selectedEvent.eventCategory,
        fields: selectedEvent.fields,
      });
    } else {
      setFactInfo({
        eventId: uuid(),
        eventName: name,
        eventDescription: factInfo.eventDescription,
        eventCategory: factInfo.eventCategory,
        fields: factInfo.fields,
      });
    }
  };
  const setEventDescription = (description) => {
    if (selectedEvent) {
      setFactInfo({
        eventId: selectedEvent.eventId,
        eventName: selectedEvent.eventName,
        eventDescription: description,
        eventCategory: selectedEvent.eventCategory,
        fields: selectedEvent.fields,
      });
    } else {
      setFactInfo({
        eventId: factInfo.eventId,
        eventName: factInfo.eventName,
        eventDescription: description,
        eventCategory: factInfo.eventCategory,
        fields: factInfo.fields,
      });
    }
  };
  const setFactFields = (fields) => {
    if (selectedEvent) {
      setFactInfo({
        eventId: selectedEvent.eventId,
        eventName: selectedEvent.eventName,
        eventDescription: selectedEvent.eventDescription,
        eventCategory: selectedEvent.eventCategory,
        fields: fields,
      });
    } else {
      setFactInfo({
        eventId: factInfo.eventId,
        eventName: factInfo.eventName,
        eventDescription: factInfo.eventDescription,
        eventCategory: factInfo.eventCategory,
        fields: fields,
      });
    }
  };
  const fieldsDetailsBuilder = (fieldData) => {
    if (fieldData?.fields?.length > 0) {
      const itemFields = fieldData.fields;

      return (
        <ListGroup>
          {itemFields.map((item) => (
            <ListGroupItem>
              {item.factDefination} - {item.factType}
            </ListGroupItem>
          ))}
        </ListGroup>
      );
    }
  };
  useEffect(() => {}, [resetInfo]);
  const fieldsMainData = () => {
    let data = [];
    eventList?.forEach((field) => {
      data.push({
        title: <h6 key={field.eventId}>{field.eventName}</h6>,
        content: (
          <Card key={field.eventId}>
            <CardBody>
              <CardTitle>
                <h6 className="mb-2 text-muted">
                  Description: {field.eventDescription}
                </h6>
              </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <h6 className="text-muted mb-1">Attributes</h6>
                {fieldsDetailsBuilder(field)}
              </CardSubtitle>
            </CardBody>
            <CardBody>
              <Button
                onClick={() => deleteEvents(field.eventId)}
                color="primary"
                outline
              >
                Delete Event
              </Button>
            </CardBody>
          </Card>
        ),
      });
    });
    setCurrentFieldData([...data]);
  };

  useEffect(() => {
    const userIdLocal = JSON.parse(localStorage.getItem("userId"));
    const eventIdLocal = localStorage.getItem("eventID");
    if (userIdLocal.userId) {
      //check if factInfo's eventName, eventDescription, fields are empty
      if (
        selectedEvent === "" &&
        factInfo.eventId !== "" &&
        factInfo.eventName !== "" &&
        factInfo.eventDescription !== "" &&
        factInfo.fields?.length !== 0
      ) {
        addEvents(userIdLocal.userId, factInfo);
      } else if (
        selectedEvent !== "" &&
        factInfo.eventId !== "" &&
        factInfo.eventName !== "" &&
        factInfo.eventDescription !== "" &&
        factInfo.fields?.length !== 0
      ) {
        updateEvents(
          factInfo.eventId,
          factInfo.fields.map((item) => {
            return {
              factDefination: item.factDefination,
              factType: item.factType,
            };
          })
        );
      }
    }
    fetchEvents();
    fieldsMainData();
  }, [factInfo]);

  useEffect(() => {
    // fetchEvents()
    fieldsMainData();
  }, [eventList]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const ref = useRef(null);

  useEffect(() => {
    if (resetInfo) {
      setResetEvent(resetInfo);
    }
  }, [resetInfo]);
  const steps = [
    {
      id: "fact-details",
      title: "Events",
      subtitle: "Enter a Name For Your Event",
      content: (
        <FactsetName
          seteventName={seteventName}
          stepper={stepper}
          type="wizard-horizontal"
          resetName={resetInfo.eventName}
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
        />
      ),
    },
    {
      id: "fact-description",
      title: "Event Description",
      subtitle: "Add Event Description",
      content: (
        <FactsetDescription
          setEventDescription={setEventDescription}
          stepper={stepper}
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
          resetDescription={resetInfo.eventDescription}
          type="wizard-horizontal"
        />
      ),
    },
    {
      id: "fact-attributes",
      title: "Event Attributes",
      subtitle: "Add Attributes",
      content: (
        <AddFact
          setFactFields={setFactFields}
          stepper={stepper}
          type="wizard-horizontal"
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
          createdEvent={factInfo.eventId}
          resetEvent={resetEvent}
          eventName={factInfo.eventName}
          showFieldsTable={showFieldsTable}
          setShowFieldsTable={setShowFieldsTable}
        />
      ),
    },
  ];

  return (
    <>
      <BreadCrumbs breadCrumbParent="CEP" breadCrumbActive="Events" />

      {wizardOpen === true ? (
        <Wizard
          type="horizontal"
          ref={ref}
          steps={steps}
          options={{
            linear: false,
          }}
          instance={(el) => setStepper(el)}
        />
      ) : (
        <EventTable
          listData={eventList}
          setResetInfo={setResetInfo}
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
          setSelectedEvent={setSelectedEvent}
          setShowFieldsTable={setShowFieldsTable}
        />
      )}
    </>
  );
}
FactBuilder.propTypes = {
  eventList: PropTypes.array,
  addEvents: PropTypes.func,
  fetchEvents: PropTypes.func,
  deleteEvents: PropTypes.func,
  updateEvents: PropTypes.func,
};

const mapStateToProps = (state) => {
  return { eventList: state.fields };
};

export default connect(mapStateToProps, {
  addEvents,
  fetchEvents,
  updateEvents,
  deleteEvents,
})(FactBuilder);
