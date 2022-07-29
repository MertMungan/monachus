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
  CardBody,
  Button,
  CustomInput,
  Label,
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
const firstTime = new Date();
const emptyInitValue = { id: QbUtils.uuid(), type: "group" };

// INIT

function QueryBuilder(props) {
  const {
    stepper,
    fieldList,
    fetchEvents,
    fetchRule,
    addRule,
    updateRule,
    queryValues,
    setRuleThirdStep,
    eventsArray,
    id,
    name,
    description,
    assignedEvent,
    assignedCategory,
    metaEventData,
    metaRuleData
  } = props;
  // STATES
  const [queryValue, setQueryValue] = useState(emptyInitValue); //Query Value From the Server
  const [queryConfig, setQueryConfig] = useState(null); //Initial Config From The server
  const [currentData, setcurrentData] = useState([]); //Data for jsonLogic
  const [isAutoSave, setIsAutoSave] = useState(false);
  const [serverPostData, setServerPostData] = useState({});
  const [lastSavedTime, setLastSavedTime] = useState(firstTime);
  const [selectedFact, setSelectedFact] = useState("");
  const [selectedRule, setSelectedRule] = useState("");
  const [ruleLogicFormat, setruleLogicFormat] = useState({});
  const [querySpecification, setQuerySpecification] = useState({
    name: "",
    description: "",
    ruleCategory: "",
  });
  const [result, setResult] = useState(null);
  const [state, setState] = useState({
    tree: null,
    config: null,
  });
  const [rulesList, setRulesList] = useState([]);
  const [newRuleID, setNewRuleID] = useState("");

  // STATES

  /// MANUEL SAVE ETTİKTEN SONRA SELECTED FACT HANDLER ÇALIŞMIYOR

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
    if (
      //selectedFact isn't undefined and isn't empty
      selectedFact !== undefined &&
      selectedFact !== ""
    ) {
      let chosenFields = null;
      setQuerySpecification({
        name: name,
        description: description,
        ruleCategory: assignedCategory,
      });
      if (newRuleID !== "") {
        const dataFoundForQuery = metaRuleData.find(function (item) {
          if (item.id === newRuleID) {
            if (item?.metadata) {
              console.log("item.metadata",item.metadata)

              chosenFields = item.metadata;
              setQueryValue(item.metadata);
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
      debugger;
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

      if (state?.tree && state?.config) {
        setruleLogicFormat(QbUtils.jsonLogicFormat(state.tree, state.config));
      }

      if (metaRuleData && metaRuleData?.length > 0) {
        setRulesList(metaRuleData);
      }
    }
  }, [selectedFact]);

  useEffect(() => {
    if (id !== "") {
      setNewRuleID(id);
    }
  }, [id]);

  useEffect(() => {
    if (
      assignedEvent !== "" &&
      assignedEvent !== undefined &&
      assignedEvent.length > 0
    ) {
      let found = metaEventData.find((item) => item.id === assignedEvent);
      setSelectedFact(found);
      localStorage.setItem("eventID", found?.id);
    }
  }, [assignedEvent]);

  // ------------------------------------------------------------
  useEffect(() => {
    isAutoSave && handleBasicTitleAlert("Danger", "Dont!");
    if (
      isAutoSave &&
      name !== "" &&
      description !== "" &&
      assignedCategory !== "" &&
      assignedEvent !== ""
    ) {
      setLastSavedTime(Date.now().toLocaleString());

      /*  addRule(
        QbUtils.uuid(),
        assignedEvent,
        name,
        description,
        assignedCategory,
        serverPostData,
        QbUtils.jsonLogicFormat(state.tree, state.config)
      ); */
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
  // FORM ACTIONS

  const onChange = (immutableTree, config) => {
    setState({ tree: immutableTree, config: config });
    const jsonTree = QbUtils.getTree(immutableTree);
    setServerPostData(jsonTree);
    /*     if (
      isAutoSave &&
      newRuleID !== "" &&
      name !== "" &&
      description !== "" &&
      assignedCategory !== "" &&
      assignedEvent !== ""
    ) {
      addRule(
        newRuleID,
        assignedEvent,
        name,
        description,
        assignedCategory,
        jsonTree,
        QbUtils.jsonLogicFormat(state.tree, state.config)
      );
    } */
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
        {newRuleID ? (
          <h5>{`Rule Builder for ${name} - ${newRuleID}`}</h5>
        ) : (
          <h5>No Rule Selected</h5>
        )}
        <Builder {...props} />
      </div>
    </div>
  );
  // BUILDERS

  return (
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
                      onClick={() => {
                        selectedFact !== "" &&
                          selectedFact !== undefined &&
                          newRuleID !== "" &&
                          setRuleThirdStep([
                            serverPostData,
                            QbUtils.jsonLogicFormat(state.tree, state.config),
                          ]),
                          /*  
                          ? updateRule(
                              id,
                              name,
                              description,
                              assignedCategory,
                              serverPostData,
                              QbUtils.jsonLogicFormat(state.tree, state.config)
                            )
                          : handleNewRule(
                              name,
                              description,
                              assignedCategory,
                              serverPostData,
                              QbUtils.jsonLogicFormat(state.tree, state.config)
                            ), */
                          stepper.next();
                      }}
                      size="lg"
                      color={isAutoSave ? "danger" : "primary"}
                      disabled={isAutoSave}
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
              <Col xs="12">{result !== null && spinnerBuilder(result)}</Col>
            </Row>
          </Card>
          <Card>
            <CardBody>
              {state.tree && state.config && (
                <ReactJson
                  src={QbUtils.jsonLogicFormat(state.tree, state.config)}
                  theme="monokai"
                />
              )}
            </CardBody>
          </Card>
          <br />
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    queryInitConfig: state.treeconfig,
    fieldList: state.fields,
    queryValues: state.query,
    metaEventData: state.metaDataEventsReducer,
    metaRuleData: state.metaDataRulesReducer

  };
};

QueryBuilder.propTypes = {
  fetchRule: PropTypes.func,
  addRule: PropTypes.func,
  updateRule: PropTypes.func,
  fetchEvents: PropTypes.func,
  fieldList: PropTypes.array,
  queryValues: PropTypes.array,
  setRuleThirdStep: PropTypes.func,
  eventsArray: PropTypes.array,
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  assignedEvent: PropTypes.string,
  assignedCategory: PropTypes.string,
  resetId: PropTypes.string,
  resetName: PropTypes.string,
  resetDescription: PropTypes.string,
  resetCategory: PropTypes.string,
  resetEvent: PropTypes.string,
  resetInfo: PropTypes.object,
  metaEventData: PropTypes.array,
  metaRuleData: PropTypes.array,
};

export default connect(mapStateToProps, {
  fetchRule,
  fetchTree,
  addRule,
  updateRule,
  fetchEvents,
  fetchRuleById,
})(QueryBuilder);
