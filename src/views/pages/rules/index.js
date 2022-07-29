// ** React Imports
import React, { Fragment, useState, useEffect, useRef } from "react";
import BreadCrumbs from "@components/breadcrumbs";
import Wizard from "@components/wizard";
// REACTSTRAP

import { fetchEvents } from "../../../redux/actions/events";
import {
  fetchRule,
  fetchAllRules,
  addRule,
  updateRule,
} from "../../../redux/actions/rules";
import { fetchMetaDataRules, addMetaDataRules,updateMetaDataRule} from '../../../redux/actions/metaDataRules'

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
  addRule = () => {},
  updateRule = () => {},
  fetchMetaDataRules = () => {},
  metaRuleData = [],
  addMetaDataRules = () => {},
  updateMetaDataRule = () => {}
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

  useEffect(() => {
    if (
      ruleInfo.id !== "" &&
      resetInfo.id === "" &&
      ruleInfo.name !== "" &&
      ruleInfo.description !== "" &&
      ruleInfo.assignedEvent !== "" &&
      ruleInfo.assignedCategory !== "" &&
      ruleInfo.builderInfo?.length > 0 &&
      ruleInfo.configuration !== ("" || {})
    ) {
      addRule(
        ruleInfo.id,
        ruleInfo.assignedEvent,
        ruleInfo.name,
        ruleInfo.description,
        ruleInfo.assignedCategory,
        ruleInfo.builderInfo[0],
        ruleInfo.builderInfo[1]
      );
    } else if (
      ruleInfo.id !== "" &&
      resetInfo.id !== "" &&
      ruleInfo.id === resetInfo.id &&
      ruleInfo.name !== "" &&
      ruleInfo.description !== "" &&
      ruleInfo.assignedEvent !== "" &&
      ruleInfo.assignedCategory !== "" &&
      ruleInfo.builderInfo?.length > 0 &&
      Object.keys(ruleInfo.builderInfo[0]).length !== 0 &&
      ruleInfo.configuration !== ("" || {})
    ) {
      updateRule(
        ruleInfo.id,
        ruleInfo.name,
        ruleInfo.description,
        ruleInfo.assignedCategory,
        ruleInfo.builderInfo[0],
        ruleInfo.builderInfo[1]
      );
    } else if (
      ruleInfo.id !== "" &&
      resetInfo.id !== "" &&
      ruleInfo.id === resetInfo.id &&
      ruleInfo.name !== "" &&
      ruleInfo.description !== "" &&
      ruleInfo.assignedEvent !== "" &&
      ruleInfo.assignedCategory !== "" &&
      ruleInfo.builderInfo.length > 0 &&
      Object.keys(ruleInfo.builderInfo[0]).length === 0 &&
      ruleInfo.configuration !== ("" || {})
    ) {
      updateRule(
        ruleInfo.id,
        ruleInfo.name,
        ruleInfo.description,
        ruleInfo.assignedCategory,
        resetInfo?.builderInfo,
        ruleInfo?.builderInfo
      );
    }
  }, [ruleInfo]);

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

  const handleRuleFourthStep = (configuration) => {
    if (ruleInfo.id) {
      setRuleInfo({
        id: ruleInfo.id,
        name: ruleInfo.name,
        description: ruleInfo.description,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: ruleInfo.builderInfo,
        configuration: configuration,
      });
    } else {
      setRuleInfo({
        id: ruleInfo.id,
        name: ruleInfo.name,
        description: ruleInfo.description,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: ruleInfo.builderInfo,
        configuration: configuration,
      });
    }
  };

  console.log("ruleInfo",ruleInfo)
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
            stepper={stepper}
            type="wizard-horizontal"
            setWizardOpen={setWizardOpen}
            wizardOpen={wizardOpen}
          />
        </>
      ),
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: ["App", "Service", "Product"],
    stroke: { width: 0 },
    colors: ["#28c76f66", "#28c76f33", "28c76f00"],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15,
            },
            value: {
              offsetY: -15,
            },
            total: {
              show: true,
              offsetY: 15,
              label: "App",
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120,
          },
        },
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120,
          },
        },
      },
    ],
  };

  
  useEffect(() => {
    if (ruleInfo.builderInfo.length > 0) {
      if (metaRuleData.find((item) => item.id === ruleInfo.id)) {
        updateMetaDataRule(ruleInfo)
    } else {
      addMetaDataRules(ruleInfo)
    }
    }
  }, [ruleInfo])

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
  return { eventList: state.fields, queryList: state.query, metaRuleData: state.metaDataRulesReducer };
};

export default connect(mapStateToProps, {
  fetchEvents,
  fetchRule,
  fetchAllRules,
  addRule,
  updateRule,
  fetchMetaDataRules,
  addMetaDataRules,
  updateMetaDataRule,
})(Roles);
