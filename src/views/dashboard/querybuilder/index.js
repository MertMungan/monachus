// BASE
import React, { useState, useEffect } from "react";
import PropTypes, { resetWarningCache } from "prop-types";
// BASE
// QUERY
import {
  Query,
  BasicConfig,
  Builder,
  Utils as QbUtils,
} from "react-awesome-query-builder";
import { treeConfig } from "./treeConfig";
import MaterialConfig from "react-awesome-query-builder/lib/config/material";
// QUERY

import ReactJson from "react-json-view";
import { Link } from "react-router-dom";

// DOM
import { useParams } from "react-router-dom";
// DOM

// FORMS
import { ThumbsUp, ThumbsDown } from "react-feather";
import { useForm } from "react-hook-form";
// FORMS

import {
  Row,
  Col,
  Card,
  CardLink,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  Button,
  CardSubtitle,
  CardText,
  CardTitle,
  CustomInput,
  Label,
  Spinner,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import jsonLogic from "json-logic-js";
import { convertToQueryBuilderFormat } from "./utils/conversation";
import { funcs } from "./utils/func";
// MODALS
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// MODALS

// REDUX
import { connect } from "react-redux";
import {
  fetchRule,
  addRule,
  updateRule,
  fetchRuleById,
} from "../../../redux/actions/rules/index";
import { fetchEvents } from "../../../redux/actions/events/index";
import { fetchTree } from "../../../redux/actions/treeConfig/index";
// REDUX

// INIT
const MySwal = withReactContent(Swal);
const emptyInitValue = { id: QbUtils.uuid(), type: "group" };
const firstTime = new Date();
// INIT

function QueryBuilder(props) {
  const {
    fieldList,
    fetchEvents,
    fetchRule,
    fetchTree,
    queryInitConfig,
    addRule,
    updateRule,
    queryValues,
    eventID,
    fetchRuleById,
  } = props;
  // STATES
  let { id } = useParams();
  const [queryValue, setQueryValue] = useState(emptyInitValue); //Query Value From the Server
  const [queryConfig, setQueryConfig] = useState(null); //Initial Config From The server
  const [currentData, setcurrentData] = useState([]); //Data for jsonLogic
  const [isAutoSave, setIsAutoSave] = useState(false);
  const [serverPostData, setServerPostData] = useState({});
  const [lastSavedTime, setLastSavedTime] = useState(firstTime);
  const [selectedFact, setSelectedFact] = useState("");
  const [selectedRule, setSelectedRule] = useState("");
  const [ruleLogicFormat, setruleLogicFormat] = useState({});
  const [ruleCategory, setRuleCategory] = useState("");
  const [querySpecification, setQuerySpecification] = useState({
    ruleName: "",
    ruleDescription: "",
    ruleCategory: "",
  });
  const [result, setResult] = useState(null);
  const [state, setState] = useState({
    tree: null,
    config: null,
  });
  const [rulesList, setRulesList] = useState([]);
  const [active, setActive] = useState("1");
  // STATES

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const selectedFactHandlerById = (id) => {
    const foundFact = fieldList?.find((field) => field.eventId === id);
    if (foundFact) {
      setSelectedFact(foundFact);
    }
  };

  /// MANUEL SAVE ETTİKTEN SONRA SELECTED FACT HANDLER ÇALIŞMIYOR
  const selectedFactHandler = () => {
    if (selectedFact) {
      localStorage.setItem("eventID", selectedFact.eventId);
      let chosenFields = null;
      setQuerySpecification({
        ruleName: selectedFact.eventName,
        ruleDescription: selectedFact.eventDescription,
        ruleCategory: ruleCategory,
      });
      if (selectedRule) {
        const dataFoundForQuery = queryValues?.data?.find(function (item) {
          if (item.id === selectedRule.id) {
            if (item?.fields) {
              chosenFields = item.fields[0];
              setQueryValue(item.fields[0]);
            }
            return true;
          } else {
            return false;
          }
        });
      }
      if (!chosenFields) {
        chosenFields = emptyInitValue;
        setQueryValue(emptyInitValue);
      }
      const convertedQueryFormat = convertToQueryBuilderFormat(selectedFact);
      const lastTreeConfig = treeConfig(
        MaterialConfig,
        convertedQueryFormat,
        funcs
      );
      setQueryConfig(lastTreeConfig);
      const treeToBeLoaded = QbUtils.loadTree(chosenFields);
      let initTree = QbUtils.checkTree(treeToBeLoaded, lastTreeConfig);
      setState({
        tree: initTree,
        config: lastTreeConfig,
      });
    }
  };

  const handleBasicTitleAlert = (title, text) => {
    return MySwal.fire({
      title: `<span><strong>${title}</strong></span>`,
      icon: "warning",
      text: `Current Status: ${text}`,
      showCloseButton: false,
      showCancelButton: true,
      focusConfirm: false,
      allowOutsideClick: false,
      confirmButtonText: (
        <span onClick={() => setIsAutoSave(false)} className="align-middle">
          <ThumbsUp className="mr-50" size={15} />
          <span className="align-middle">Manuel Save</span>
        </span>
      ),
      cancelButtonText: (
        <ThumbsDown size={15} onClick={() => setIsAutoSave(true)} />
      ),
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ml-1",
      },
      buttonsStyling: false,
    });
  };
  // USE EFFECT
  useEffect(() => {
    fetchEvents();
    fetchRule();
  }, []);

  useEffect(() => {
    if (state?.tree && state?.config) {
      setruleLogicFormat(QbUtils.jsonLogicFormat(state.tree, state.config));
    }
    if (id) {
      selectedFactHandlerById(id);
    }

    if (queryValues?.data && queryValues?.data.length > 0) {
      setRulesList(queryValues.data);
    }
  }, [queryValues]);

  useEffect(() => {
    if (id) {
      selectedFactHandlerById(id);
    } else {
      selectedFactHandler();
    }
    fetchRuleById(selectedFact.eventId);
  }, [selectedFact, selectedRule]);
  // ------------------------------------------------------------
  useEffect(() => {
    isAutoSave && handleBasicTitleAlert("Danger", "Dont!");
    if (
      isAutoSave &&
      querySpecification.ruleDescription &&
      querySpecification.ruleName &&
      querySpecification.ruleCategory &&
      selectedFact?.eventId
    ) {
      setLastSavedTime(Date.now().toLocaleString());

      addRule(
        QbUtils.uuid(),
        selectedFact.eventId,
        querySpecification.ruleName,
        querySpecification.ruleDescription,
        querySpecification.ruleCategory,
        serverPostData,
        QbUtils.jsonLogicFormat(state.tree, state.config)
      );
    }
  }, [isAutoSave]);
  // ------------------------------------------------------------
  useEffect(() => {
    if (state?.tree && state?.config) {
      const jsonLogicRules = QbUtils.jsonLogicFormat(state.tree, state.config);
      setruleLogicFormat(jsonLogicRules);
      const jsonLogicCurrentState = jsonLogic.apply(
        jsonLogicRules.logic,
        currentData
      );
      setResult(jsonLogicCurrentState);
      // handleBasicTitleAlert()
    }
  }, [currentData]);
  // USE EFFECT
  // FROMS
  const {
    register: registerQuery,
    reset,
    handleSubmit: handleQuery,
    formState: { errors: queryErrors },
  } = useForm();
  // FROMS
  useEffect(() => {
    if (selectedRule !== "") {
      reset({ ruleCategory: selectedRule.category });
    }
  }, [selectedRule]);
  // FORM ACTIONS
  const onSubmitQuery = ({ ruleName, ruleDescription, ruleCategory }) => {
    setQuerySpecification({
      ruleName: ruleName,
      ruleDescription: ruleDescription,
      ruleCategory: ruleCategory,
    });
  };

  const handleNewRule = (eventID, name, desc, category, fields, rule) => {
    const newRuleID = QbUtils.uuid();
    addRule(newRuleID, eventID, name, desc, category, fields, rule);
  };
  const onChange = (immutableTree, config) => {
    setState({ tree: immutableTree, config: config });
    const jsonTree = QbUtils.getTree(immutableTree);
    setServerPostData(jsonTree);
    if (
      isAutoSave &&
      querySpecification.ruleDescription &&
      querySpecification.ruleName &&
      querySpecification.ruleCategory &&
      selectedFact?.eventId
    ) {
      addRule(
        QbUtils.uuid(),
        selectedFact.eventId,
        querySpecification.ruleName,
        querySpecification.ruleDescription,
        querySpecification.ruleCategory,
        jsonTree,
        QbUtils.jsonLogicFormat(state.tree, state.config)
      );
    }
  };
  // FORM ACTIONS

  // BUILDERS
  const renderBuilder = (props) => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
      <div className="query-builder">
        <div className="d-flex justify-content-end">
          <Label className="mt-0" for="autoSave-stub">
            Auto Save {lastSavedTime && `Last Saved ${lastSavedTime}`}
          </Label>
          <CustomInput
            onChange={(e) => setIsAutoSave(e.target.checked)}
            checked={isAutoSave}
            type="switch"
            id="autoSave-stub"
          />
        </div>
        {selectedRule ? (
          <h5>{`Rule Builder for ${selectedRule.name} - ${selectedRule.id}`}</h5>
        ) : (
          <h5>No Rule Selected</h5>
        )}
        <Builder {...props} />
      </div>
    </div>
  );
  // BUILDERS

  const breadCrumbParent = "CEP";
  const breadCrumbParent2 = "Rule Builder";

  function restorePage() {
    window.location.reload(true);
  }

  return (
    <>
      <Row>
        <Breadcrumb>
          <BreadcrumbItem tag="li" className="mb-1 pl-0">
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem tag="li" className="text-primary">
            {breadCrumbParent}
          </BreadcrumbItem>
          <BreadcrumbItem tag="li" className="text-primary">
            <Link onClick={restorePage}>{breadCrumbParent2}</Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Row>
      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            Create
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            Configuration
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <Card>
            <CardBody>
              <h5 for="eventList">Event List</h5>
              <select
                className="form-control"
                id="eventList"
                name="eventList"
                onChange={(e) => {
                  if (e.target.value === "") return;
                  setSelectedFact(
                    fieldList.find((field) => field.eventId === e.target.value)
                  );
                }}
              >
                <option value="" hidden>
                  Select Event Set
                </option>
                {fieldList?.map((field) => (
                  <option value={field.eventId}>{field.eventName}</option>
                ))}
              </select>
              <br />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h5 for="ruleList">Rules</h5>
              <select
                className="form-control"
                id="ruleList"
                name="ruleList"
                onChange={(e) => {
                  let found = rulesList.find(
                    (rule) => rule.id === e.target.value
                  );
                  if (found) {
                    setSelectedRule(found);
                  } else {
                    setSelectedRule("");
                  }
                }}
              >
                <option value="">Select Rule</option>
                {rulesList
                  ?.filter(
                    (rule) =>
                      !selectedFact ||
                      (selectedFact && rule.eventID === selectedFact.eventId)
                  )
                  ?.map((rule) => (
                    <option value={rule.id}>
                      {rule.name} - {rule.id}
                    </option>
                  ))}
              </select>
              <br />
              {selectedRule?.id && <h5>Selected Rule: {selectedRule.id}</h5>}
            </CardBody>
          </Card>
          <Card>
            {/* ADD AUTO SAVE SWITCH */}
            <CardBody>
              <form onChange={handleQuery(onSubmitQuery)}>
                <h5>Rule Name</h5>
                <input
                  id="ruleName"
                  className="form-control"
                  type="text"
                  placeholder="Rule Name"
                  name="ruleName"
                  value={querySpecification.ruleName}
                  ref={registerQuery({ min: 3, required: true })}
                />
                <br />
                <h5>Rule Description</h5>
                <input
                  id="ruleDescription"
                  className="form-control mb-1"
                  type="text"
                  placeholder="Rule Description"
                  name="ruleDescription"
                  value={querySpecification.ruleDescription}
                  ref={registerQuery({})}
                />

                <h5 for="ruleCategory">Rule Category</h5>
                <select
                  className="form-control"
                  id="ruleCategory"
                  name="ruleCategory"
                  ref={registerQuery({})}
                  onChange={(e) => setRuleCategory(e.target.value)}
                >
                  <option value="" hidden>
                    Select Event Set
                  </option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="network">Network</option>
                </select>
              </form>
            </CardBody>
          </Card>
          {selectedFact !== "" && (
            <>
              {state?.config && state.tree && queryConfig && (
                <>
                  <Card>
                    <CardBody>
                      <>
                        <Query
                          {...state.config}
                          value={state.tree}
                          onChange={onChange}
                          renderBuilder={renderBuilder}
                        />
                        <Row className="" style={{ textAlign: "center" }}>
                          <Col xs="12" className="">
                            <Button
                              onClick={() =>
                                selectedRule !== ""
                                  ? updateRule(
                                      selectedRule.id,
                                      querySpecification.ruleName,
                                      querySpecification.ruleDescription,
                                      ruleCategory,
                                      serverPostData,
                                      QbUtils.jsonLogicFormat(
                                        state.tree,
                                        state.config
                                      )
                                    )
                                  : handleNewRule(
                                      selectedFact.eventId,
                                      querySpecification.ruleName,
                                      querySpecification.ruleDescription,
                                      ruleCategory,
                                      serverPostData,
                                      QbUtils.jsonLogicFormat(
                                        state.tree,
                                        state.config
                                      )
                                    )
                              }
                              size="lg"
                              color={isAutoSave ? "danger" : "primary"}
                              disabled={
                                isAutoSave ||
                                !querySpecification.ruleDescription ||
                                !querySpecification.ruleName ||
                                !querySpecification.ruleCategory ||
                                !selectedFact
                              }
                            >
                              Save
                            </Button>
                          </Col>
                        </Row>
                      </>
                    </CardBody>
                  </Card>
                  <Card className="m-0">
                    <Row>
                      <Col xs="12">
                        {result !== null && spinnerBuilder(result)}
                      </Col>
                    </Row>
                  </Card>
                  <Card>
                    <CardBody>
                      {state.tree && state.config && (
                        <ReactJson
                          src={QbUtils.jsonLogicFormat(
                            state.tree,
                            state.config
                          )}
                          theme="monokai"
                        />
                      )}
                    </CardBody>
                  </Card>
                  <br />
                </>
              )}
            </>
          )}
        </TabPane>
        <TabPane tabId="2">
          <h4 className="mb-1"> Action Settings</h4>
          <Row>
            <Col xl={4} md={4}>
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h4">Email</CardTitle>
                  <CardSubtitle className="text-muted mb-1"></CardSubtitle>
                  <CardText>
                    Send out notifications via email and design them with an
                    integrated template editor.
                  </CardText>
                  <CardLink href="/" onClick={(e) => e.preventDefault()}>
                    Details
                  </CardLink>
                  <CardLink href="/" onClick={(e) => e.preventDefault()}>
                    Set
                  </CardLink>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={4}>
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h4">API</CardTitle>
                  <CardSubtitle className="text-muted mb-1"></CardSubtitle>
                  <CardText>
                    Pull notifications from the API to show them in your user
                    interface.
                  </CardText>
                  <CardLink href="/" onClick={(e) => e.preventDefault()}>
                    Details
                  </CardLink>
                  <CardLink href="/" onClick={(e) => e.preventDefault()}>
                    Set
                  </CardLink>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={4}>
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h4">Web Push</CardTitle>
                  <CardSubtitle className="text-muted mb-1"></CardSubtitle>
                  <CardText>
                    Use push notifications to modern browsers like Firefox and
                    chrome.
                  </CardText>
                  <CardLink href="/" onClick={(e) => e.preventDefault()}>
                    Details
                  </CardLink>
                  <CardLink href="/" onClick={(e) => e.preventDefault()}>
                    Set
                  </CardLink>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={4} md={4}>
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h4">Mobile Push</CardTitle>
                  <CardSubtitle className="text-muted mb-1"></CardSubtitle>
                  <CardText>
                    Forward your notifications to iOS and Android devices.
                  </CardText>
                  <CardLink href="/" onClick={(e) => e.preventDefault()}>
                    Details
                  </CardLink>
                  <CardLink href="/" onClick={(e) => e.preventDefault()}>
                    Set
                  </CardLink>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={4}>
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h4">Messaging</CardTitle>
                  <CardSubtitle className="text-muted mb-1"></CardSubtitle>
                  <CardText>
                    Use modern messaging solutions like WhatsApp.
                  </CardText>
                  <CardLink href="/" onClick={(e) => e.preventDefault()}>
                    Details
                  </CardLink>
                  <CardLink href="/" onClick={(e) => e.preventDefault()}>
                    Set
                  </CardLink>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={4}>
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h4">SMS</CardTitle>
                  <CardSubtitle className="text-muted mb-1"></CardSubtitle>
                  <CardText>
                    Send urgent messages via SMS when they have not been
                    received via other channels.
                  </CardText>
                  <CardLink href="/" onClick={(e) => e.preventDefault()}>
                    Details
                  </CardLink>
                  <CardLink href="/" onClick={(e) => e.preventDefault()}>
                    Set
                  </CardLink>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    queryInitConfig: state.treeconfig,
    fieldList: state.fields,
    queryValues: state.query,
  };
};

QueryBuilder.propTypes = {
  fetchRule: PropTypes.func,
  fetchTree: PropTypes.func,
  queryInitConfig: PropTypes.object,
  addRule: PropTypes.func,
  updateRule: PropTypes.func,
  fetchEvents: PropTypes.func,
  fieldList: PropTypes.array,
  queryValues: PropTypes.array,
};

export default connect(mapStateToProps, {
  fetchRule,
  fetchTree,
  addRule,
  updateRule,
  fetchEvents,
  fetchRuleById,
})(QueryBuilder);
