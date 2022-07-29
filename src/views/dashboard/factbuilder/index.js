import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import EventTable from "./EventTable";
import Wizard from "@components/wizard";
import FactsetName from "./steps/factsetName";
import FactsetDescription from "./steps/factsetDescription";
import AddFact from "./steps/addFacts";
import BreadCrumbs from "@components/breadcrumbs";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import uuid from "react-uuid";

// REDUX
import { connect } from "react-redux";
import {
  fetchEvents,
  updateEvents,
  deleteEvents,
} from "../../../redux/actions/events/index";

import {fetchMetaDataEvents,addMetaDataEvents,updateMetaDataEvents} from '../../../redux/actions/metaDataEvents'
// REDUX

function FactBuilder(props) {
  const { eventList, fetchEvents, deleteEvents, updateEvents, fetchMetaDataEvents, metaDataEvents,addMetaDataEvents,updateMetaDataEvents } =
    props;
  const [stepper, setStepper] = useState(null);
  const [currentFieldData, setCurrentFieldData] = useState([]);
  const [factInfo, setFactInfo] = useState({
    id: "",
    name: "",
    description: "",
    fields: [],
  });
  const [resetInfo, setResetInfo] = useState({
    id: "",
    name: "",
    description: "",
    fields: [],
  });
  const [wizardOpen, setWizardOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [showFieldsTable, setShowFieldsTable] = useState(false);
  const [resetEvent, setResetEvent] = useState({});


  const seteventName = (name) => {
    if (selectedEvent) {
      console.log("SELECTED EVENT ÇALIŞIYOR")
      setFactInfo({
        id: selectedEvent.id,
        name: name,
        description: selectedEvent.description,
        fields: selectedEvent.metadata,
      });
    } else {
      console.log("FACT INFO ÇALIŞIYOR")
      setFactInfo({
        id: uuid(),
        name: name,
        description: factInfo.description,
        fields: factInfo.fields,
      });
    }
  };
  const setEventDescription = (description) => {
    if (selectedEvent) {
      setFactInfo({
        id: selectedEvent.id,
        name: factInfo.name,
        description: description,
        fields: factInfo.fields,
      });
    } else {
      setFactInfo({
        id: factInfo.id,
        name: factInfo.name,
        description: description,
        fields: factInfo.fields,
      });
    }
  };
  const setFactFields = (fields) => {
    if (selectedEvent) {
      setFactInfo({
        id: selectedEvent.id,
        name: factInfo.name,
        description: factInfo.description,
        fields: fields,
      });
    } else {
      setFactInfo({
        id: factInfo.id,
        name: factInfo.name,
        description: factInfo.description,
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


  const fieldsMainData = () => {
    let data = [];
    eventList?.forEach((field) => {
      data.push({
        title: <h6 key={field.id}>{field.name}</h6>,
        content: (
          <Card key={field.id}>
            <CardBody>
              <CardTitle>
                <h6 className="mb-2 text-muted">
                  Description: {field.description}
                </h6>
              </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <h6 className="text-muted mb-1">Attributes</h6>
                {fieldsDetailsBuilder(field)}
              </CardSubtitle>
            </CardBody>
            <CardBody>
              <Button
                onClick={() => deleteEvents(field.id)}
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
      //check if factInfo's name, description, fields are empty
      if (
        selectedEvent === "" &&
        factInfo.id !== "" &&
        factInfo.name !== "" &&
        factInfo.description !== "" &&
        factInfo.fields?.length !== 0
      ) {
      } else if (
        selectedEvent !== "" &&
        factInfo.id !== "" &&
        factInfo.name !== "" &&
        factInfo.description !== "" &&
        factInfo.fields?.length !== 0
      ) {
        updateEvents(
          factInfo?.id,
          factInfo.fields?.map((item) => {
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
    fetchMetaDataEvents()
  }, []);
  const ref = useRef(null);

  useEffect(() => {
    if (resetInfo) {
      setResetEvent(resetInfo);
    }
  }, [resetInfo]);

  useEffect(() => {    
    if (factInfo.fields?.length > 0) {
      if (metaDataEvents.find((item) => item.id === factInfo.id)) {
        updateMetaDataEvents(factInfo)
      } else {
        addMetaDataEvents(factInfo)
      }
    }
  }, [factInfo])
  
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
          resetName={resetInfo.name}
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
          resetDescription={resetInfo.description}
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
          createdEvent={factInfo.id}
          resetEvent={resetEvent}
          eventName={factInfo.name}
          showFieldsTable={showFieldsTable}
          setShowFieldsTable={setShowFieldsTable}
          factInfo = {factInfo}
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
          listData={metaDataEvents}
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
  metaDataEvents: PropTypes.array,
  fetchEvents: PropTypes.func,
  deleteEvents: PropTypes.func,
  updateEvents: PropTypes.func,
  fetchMetaDataEvents: PropTypes.func,
  addMetaDataEvents: PropTypes.func,
  updateMetaDataEvents: PropTypes.func,
};

const mapStateToProps = (state) => {
  return { eventList: state.fields, metaDataEvents: state.metaDataEventsReducer };
};

export default connect(mapStateToProps, {
  fetchEvents,
  updateEvents,
  deleteEvents,
  fetchMetaDataEvents,
  addMetaDataEvents,
  updateMetaDataEvents,
})(FactBuilder);
