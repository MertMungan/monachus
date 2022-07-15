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
  fetchEvents = () => {},
  queryList = [],
  fetchRule = () => {},
  addRule = () => {},
  fetchAllRules = () => {},
  updateRule = () => {},
}) => {
  const [rulesCategory, setRulesCategory] = useState([]);
  const [eventsArray, setEventsArray] = useState([]);
  const [listData, setListData] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [tableCategories, setTableCategories] = useState([]);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [resetInfo, setResetInfo] = useState({
    ruleId: "",
    ruleName: "",
    ruleDescription: "",
    assignedEvent: "",
    assignedCategory: "",
    builderInfo: [],
    configuration: "",
  });
  const [ruleInfo, setRuleInfo] = useState({
    ruleId: "",
    ruleName: "",
    ruleDescription: "",
    assignedEvent: "",
    assignedCategory: "",
    builderInfo: [],
    configuration: "",
  });
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedRule, setSelectedRule] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [stepper, setStepper] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    fetchAllRules();
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchAllRules();
  }, [wizardOpen]);

  useEffect(() => {
    if (resetInfo.ruleId !== "") {
      setRuleInfo({
        ruleId: resetInfo.ruleId,
        ruleName: ruleInfo.ruleName,
        ruleDescription: ruleInfo.ruleDescription,
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
      ruleInfo.ruleId !== "" &&
      resetInfo.ruleId === "" &&
      ruleInfo.ruleName !== "" &&
      ruleInfo.ruleDescription !== "" &&
      ruleInfo.assignedEvent !== "" &&
      ruleInfo.assignedCategory !== "" &&
      ruleInfo.builderInfo?.length > 0 &&
      ruleInfo.configuration !== ("" || {})
    ) {
      addRule(
        ruleInfo.ruleId,
        ruleInfo.assignedEvent,
        ruleInfo.ruleName,
        ruleInfo.ruleDescription,
        ruleInfo.assignedCategory,
        ruleInfo.builderInfo[0],
        ruleInfo.builderInfo[1]
      );
    } else if (
      ruleInfo.ruleId !== "" &&
      resetInfo.ruleId !== "" &&
      ruleInfo.ruleId === resetInfo.ruleId &&
      ruleInfo.ruleName !== "" &&
      ruleInfo.ruleDescription !== "" &&
      ruleInfo.assignedEvent !== "" &&
      ruleInfo.assignedCategory !== "" &&
      ruleInfo.builderInfo?.length > 0 &&
      Object.keys(ruleInfo.builderInfo[0]).length !== 0 &&
      ruleInfo.configuration !== ("" || {})
    ) {
      updateRule(
        ruleInfo.ruleId,
        ruleInfo.ruleName,
        ruleInfo.ruleDescription,
        ruleInfo.assignedCategory,
        ruleInfo.builderInfo[0],
        ruleInfo.builderInfo[1]
      );
    } else if (
      ruleInfo.ruleId !== "" &&
      resetInfo.ruleId !== "" &&
      ruleInfo.ruleId === resetInfo.ruleId &&
      ruleInfo.ruleName !== "" &&
      ruleInfo.ruleDescription !== "" &&
      ruleInfo.assignedEvent !== "" &&
      ruleInfo.assignedCategory !== "" &&
      ruleInfo.builderInfo.length > 0 &&
      Object.keys(ruleInfo.builderInfo[0]).length === 0 &&
      ruleInfo.configuration !== ("" || {})
    ) {
      updateRule(
        ruleInfo.ruleId,
        ruleInfo.ruleName,
        ruleInfo.ruleDescription,
        ruleInfo.assignedCategory,
        resetInfo.builderInfo[0],
        ruleInfo.builderInfo[1]
      );
    }
  }, [ruleInfo]);

  const handleRuleFirstStep = (name, desc) => {
    if (ruleInfo.ruleId) {
      setRuleInfo({
        ruleId: ruleInfo.ruleId,
        ruleName: name,
        ruleDescription: desc,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: ruleInfo.builderInfo,
        configuration: ruleInfo.configuration,
      });
    } else {
      setRuleInfo({
        ruleId: uuid(),
        ruleName: name,
        ruleDescription: desc,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: ruleInfo.builderInfo,
        configuration: ruleInfo.configuration,
      });
    }
  };

  const handleRuleSecondStep = (event, category) => {
    if (ruleInfo.ruleId) {
      setRuleInfo({
        ruleId: ruleInfo.ruleId,
        ruleName: ruleInfo.ruleName,
        ruleDescription: ruleInfo.ruleDescription,
        assignedEvent: event,
        assignedCategory: category,
        builderInfo: ruleInfo.builderInfo,
        configuration: ruleInfo.configuration,
      });
    } else {
      setRuleInfo({
        ruleId: ruleInfo.ruleId,
        ruleName: ruleInfo.ruleName,
        ruleDescription: ruleInfo.ruleDescription,
        assignedEvent: event,
        assignedCategory: category,
        builderInfo: ruleInfo.builderInfo,
        configuration: ruleInfo.configuration,
      });
    }
  };

  const handleRuleThirdStep = (builderInfo) => {
    if (ruleInfo.ruleId) {
      setRuleInfo({
        ruleId: ruleInfo.ruleId,
        ruleName: ruleInfo.ruleName,
        ruleDescription: ruleInfo.ruleDescription,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: builderInfo,
        configuration: ruleInfo.configuration,
      });
    } else {
      setRuleInfo({
        ruleId: ruleInfo.ruleId,
        ruleName: ruleInfo.ruleName,
        ruleDescription: ruleInfo.ruleDescription,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: builderInfo,
        configuration: ruleInfo.configuration,
      });
    }
  };

  const handleRuleFourthStep = (configuration) => {
    if (ruleInfo.ruleId) {
      setRuleInfo({
        ruleId: ruleInfo.ruleId,
        ruleName: ruleInfo.ruleName,
        ruleDescription: ruleInfo.ruleDescription,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: ruleInfo.builderInfo,
        configuration: configuration,
      });
    } else {
      setRuleInfo({
        ruleId: ruleInfo.ruleId,
        ruleName: ruleInfo.ruleName,
        ruleDescription: ruleInfo.ruleDescription,
        assignedEvent: ruleInfo.assignedEvent,
        assignedCategory: ruleInfo.assignedCategory,
        builderInfo: ruleInfo.builderInfo,
        configuration: configuration,
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
          resetName={resetInfo.ruleName}
          resetDescription={resetInfo.ruleDescription}
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
            ruleId={ruleInfo.ruleId}
            ruleName={ruleInfo.ruleName}
            ruleDescription={ruleInfo.ruleDescription}
            assignedEvent={selectedEvent}
            assignedCategory={ruleInfo.assignedCategory}
            resetId={resetInfo.ruleId}
            resetName={resetInfo.ruleName}
            resetDescription={resetInfo.ruleDescription}
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

  return (
    <Fragment>
      <BreadCrumbs breadCrumbParent="CEP" breadCrumbActive="Rules" />

      {/*   <Fragment>
                <Row className="px-0 ">
          {rulesCategory?.map((item, index) => {
            if (item === "") {
              return (
                <Col key={index} xl={8} md={6}>
                  <Card className="mb-4">
                    <CardBody>
                      <Row>
                        <Col xs="3">
                          <CardTitle className="mb-1">Earnings</CardTitle>
                          <div className="font-small-2">This Month</div>
                          <h5 className="mb-1">$4055.56</h5>
                          <CardText className="text-muted font-small-2">
                            <span className="font-weight-bolder">68.2%</span>
                            <span> more earnings than last month.</span>
                          </CardText>
                        </Col>
                        <Col xs="3">
                          <Chart
                            options={options}
                            series={[53, 16, 31]}
                            type="donut"
                            height={150}
                          />
                        </Col>
                        <Col xs="3">
                          <Chart
                            options={options}
                            series={[53, 16, 31]}
                            type="donut"
                            height={150}
                          />
                        </Col>
                        <Col xs="3">
                          <Chart
                            options={options}
                            series={[53, 16, 31]}
                            type="donut"
                            height={150}
                          />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              );
            } else {
              return (
                <Col key={index} xl={4} md={6}>
                  <Card>
                    <CardBody>
                      <div className="d-flex justify-content-between">
                        <h4>{capitalizeFirst(item)}</h4>

                        <AvatarGroup
                          //avatar group's data should be the picData's objects users property
                          data={
                            picData.map((item) => {
                              return item.users;
                            })[index]
                          }
                        />
                      </div>
                      <div className="d-flex  mt-3 ">
                        <span>{`Total ${
                          queryList.data?.filter(
                            (rule) => rule.category === item
                          ).length
                        } Rules`}</span>
                      </div>
                      <Row className="pl-0 mt-3">
                        <Col>
                          <Link
                            className="role-edit-modal"
                            onClick={(e) =>
                              setListData(
                                queryList.data?.filter(
                                  (rule) => rule.category === item
                                )
                              )
                            }
                          >
                            <small className="fw-bolder">List Details</small>
                          </Link>
                        </Col>
                        <Col style={{ textAlign: "right" }}>
                          <Link
                            to=""
                            className="text-body"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Copy className="font-medium-5" />
                          </Link>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              );
            }
          })}
        </Row> 
      </Fragment> */}
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
  return { eventList: state.fields, queryList: state.query };
};

export default connect(mapStateToProps, {
  fetchEvents,
  fetchRule,
  fetchAllRules,
  addRule,
  updateRule,
})(Roles);
