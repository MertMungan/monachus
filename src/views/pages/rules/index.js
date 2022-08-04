// ** React Imports
import React, { Fragment, useState, useEffect, useRef } from "react";
import BreadCrumbs from "@components/breadcrumbs";
import Wizard from "@components/wizard";
// REACTSTRAP

import { fetchMetaDataRules, addMetaDataRules, updateMetaDataRule } from '../../../redux/actions/metaDataRules'

// ** Roles Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { X } from "react-feather";

import Table from "./Table";
import { connect } from "react-redux";
import RuleFirstStep from "./RuleFirstStep";
import RuleSecondStep from "./RuleSecondStep";
import RuleThirdStep from "./RuleThirdStep";
import RuleFourthStep from "./RuleFourthStep";
import uuid from "react-uuid";

const Roles = ({
  eventList = [],
  queryList = [],
  addRule = () => { },
  updateRule = () => { },
  fetchMetaDataRules = () => { },
  metaRuleData = [],
  addMetaDataRules = () => { },
  updateMetaDataRule = () => { }
}) => {
  const [rulesCategory, setRulesCategory] = useState([]);
  const [eventsArray, setEventsArray] = useState([]);
  const [listData, setListData] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [resetInfo, setResetInfo] = useState({
    id: "",
    name: "",
    description: "",
    assignedEvent: "",
    assignedCategory: "",
    builderInfo: [],
    configuration: "",
  });
  const [ruleInfo, setRuleInfo] = useState({
    id: "",
    name: "",
    description: "",
    assignedEvent: "",
    assignedCategory: "",
    builderInfo: [],
    configuration: "",
  });
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedRule, setSelectedRule] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [stepper, setStepper] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [sendData, setSendData] = useState(false)
  const ref = useRef(null);


  useEffect(() => {
    fetchMetaDataRules();
  }, []);

  useEffect(() => {
    setListData(metaRuleData)
  }, [metaRuleData])


  useEffect(() => {
    if (resetInfo.id !== "") {
      setRuleInfo({
        id: resetInfo.id,
        name: ruleInfo.name,
        description: ruleInfo.description,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: ruleInfo.builderInfo,
        configuration: ruleInfo.configuration,
      });
    }
  }, [resetInfo]);

  useEffect(() => {
    if (eventList.length > 0) {
      setEventsArray(eventList);
      if (ruleInfo.assignedEvent !== "") {
      }
    }
    if (queryList?.data?.length > 0) {
      const categoryArray = queryList.data?.map((rule) => rule.category);
      const unique_array = [...new Set(categoryArray)];
      setRulesCategory(unique_array);
    }
  }, [eventList, queryList]);

  const capitalizeFirst = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };

  const handleRuleFirstStep = (name, desc) => {
    if (ruleInfo.id) {
      setRuleInfo({
        id: ruleInfo.id,
        name: name,
        description: desc,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: ruleInfo.builderInfo,
        configuration: ruleInfo.configuration,
      });
    } else {
      setRuleInfo({
        id: uuid(),
        name: name,
        description: desc,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: ruleInfo.builderInfo,
        configuration: ruleInfo.configuration,
      });
    }
  };

  const handleRuleSecondStep = (event, category) => {
    console.log("event", event)
    if (ruleInfo.id) {
      setRuleInfo({
        id: ruleInfo.id,
        name: ruleInfo.name,
        description: ruleInfo.description,
        assignedEvent: event,
        assignedCategory: category,
        builderInfo: ruleInfo.builderInfo,
        configuration: ruleInfo.configuration,
      });
    } else {
      setRuleInfo({
        id: ruleInfo.id,
        name: ruleInfo.name,
        description: ruleInfo.description,
        assignedEvent: event,
        assignedCategory: category,
        builderInfo: ruleInfo.builderInfo,
        configuration: ruleInfo.configuration,
      });
    }
  };

  const handleRuleThirdStep = (builderInfo) => {
    if (ruleInfo.id) {
      setRuleInfo({
        id: ruleInfo.id,
        name: ruleInfo.name,
        description: ruleInfo.description,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: builderInfo,
        configuration: ruleInfo.configuration,
      });
    } else {
      setRuleInfo({
        id: ruleInfo.id,
        name: ruleInfo.name,
        description: ruleInfo.description,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: builderInfo,
        configuration: ruleInfo.configuration,
      });
    }
  };

  const handleRuleFourthStep = (totalData) => {
    if (ruleInfo.id) {
      setRuleInfo({
        id: ruleInfo.id,
        name: ruleInfo.name,
        description: ruleInfo.description,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: ruleInfo.builderInfo,
        totalData: totalData,
      });
    } else {
      setRuleInfo({
        id: ruleInfo.id,
        name: ruleInfo.name,
        description: ruleInfo.description,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: ruleInfo.builderInfo,
        totalData: totalData,
      });
    }
  };

  const steps = [
    {
      id: "rule-definition",
      title: "Rule",
      subtitle: "Enter Name and Description",
      content: (
        <RuleFirstStep
          setRuleFirstStep={handleRuleFirstStep}
          stepper={stepper}
          type="wizard-horizontal"
          resetName={resetInfo.name}
          resetDescription={resetInfo.description}
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
        />
      ),
    },
    {
      id: "rule-details",
      title: "Rule Details",
      subtitle: "Select Event and Category",
      content: (
        <>
          <RuleSecondStep
            setRuleSecondStep={handleRuleSecondStep}
            stepper={stepper}
            type="wizard-horizontal"
            resetEvent={resetInfo.assignedEvent}
            resetCategory={resetInfo.assignedCategory}
            setWizardOpen={setWizardOpen}
            wizardOpen={wizardOpen}
            eventsArray={eventsArray}
            rulesCategory={rulesCategory}
            setSelectedEvent={setSelectedEvent}
            setSelectedCategory={setSelectedCategory}
            resetInfo={resetInfo}
          />
        </>
      ),
    },
    {
      id: "rule-building",
      title: "Rule Builder",
      subtitle: "Build Your Rule",
      content: (
        <>
          <RuleThirdStep
            setRuleThirdStep={handleRuleThirdStep}
            stepper={stepper}
            setWizardOpen={setWizardOpen}
            eventsArray={eventsArray}
            id={ruleInfo.id}
            name={ruleInfo.name}
            description={ruleInfo.description}
            assignedEvent={selectedEvent}
            assignedCategory={ruleInfo.assignedCategory}
            resetId={resetInfo.id}
            resetName={resetInfo.name}
            resetDescription={resetInfo.description}
            resetEvent={ruleInfo.assignedEvent}
            resetCategory={resetInfo.assignedCategory}
            resetInfo={resetInfo}
          />
        </>
      ),
    },
    {
      id: "rule-configuration",
      title: "Rule Configuration",
      subtitle: "Assign Your Rule",
      content: (
        <>
          <RuleFourthStep
            setRuleFourthStep={handleRuleFourthStep}
            setSendData={setSendData}
            stepper={stepper}
            type="wizard-horizontal"
            setWizardOpen={setWizardOpen}
            wizardOpen={wizardOpen}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    if (sendData) {
      if (metaRuleData.find((item) => item.id === ruleInfo.id)) {
        updateMetaDataRule(ruleInfo)
      } else {
        addMetaDataRules(ruleInfo)
      }
    }
  }, [sendData])

  return (
    <Fragment>
      <BreadCrumbs breadCrumbParent="CEP" breadCrumbActive="Rules" />
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
        /*      <EventTable
          listData={eventList}
          resetInfo={resetInfo}
          setResetInfo={setResetInfo}
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
        /> */
        // if ruleInfo.assignedEvent is not empty, then show the event table
        <Table
          listData={listData}
          resetInfo={resetInfo}
          setResetInfo={setResetInfo}
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
          categoryArray={rulesCategory}
          eventsArray={eventsArray}
          setSelectedEvent={setSelectedEvent}
          setSelectedRule={setSelectedRule}
          appliedEvent={selectedEvent}
        />
      )}

      <div
        className={classnames("customizer d-none d-md-block", {
          open: openSidebar,
        })}
      >
        <PerfectScrollbar className="customizer-content">
          <a
            href="/"
            className="customizer-close"
            onClick={() => setOpenSidebar(false)}
          >
            <X />
          </a>
        </PerfectScrollbar>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {metaRuleData: state.metaDataRulesReducer };
};

export default connect(mapStateToProps, {
  fetchMetaDataRules,
  addMetaDataRules,
  updateMetaDataRule,
})(Roles);
