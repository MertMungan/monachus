import React, { useEffect, useState, useRef } from "react";
import EventTable from "./EventTable";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import BreadCrumbs from "@components/breadcrumbs";
import FirstStep from "./steps/FirstStep";
import Wizard from "@components/wizard";

import { addRuleCategory,fetchRuleCategory } from "../../../redux/actions/ruleCategory";
import { add } from "lodash";
const Index = ({ categoryData = [], addRuleCategory = () => {},fetchRuleCategory  = () => {}}) => {
  const [categoryList, setCategoryList] = useState([]);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [stepper, setStepper] = useState(null);
  const [resetInfo, setResetInfo] = useState({});
  const [category, setCategory] = useState({});
  useEffect(() => {
    if (categoryData) {
      setCategoryList(categoryData);
    }
  }, [categoryData]);
useEffect(() => {
  fetchRuleCategory()
}, [])

console.log("categoryData",categoryData)
  const ref = useRef(null);

  useEffect(() => {
    if (category.categoryId) {
      // console.log("category", category);
      addRuleCategory(category);
    }
  }, [category]);
  const steps = [
    {
      id: "categoryDetails",
      title: "Category Details",
      // subtitle: "Add Attributes",
      content: (
        <FirstStep
          stepper={stepper}
          type="horizontal"
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
          setCategory={setCategory}
          resetInfo={resetInfo}
        />
      ),
    },
  ];

  return (
    <>
      <BreadCrumbs breadCrumbParent="CEP" breadCrumbActive="Rule Categories" />
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
        <>
          <EventTable
            listData={categoryList}
            wizardOpen={wizardOpen}
            setWizardOpen={setWizardOpen}
            setResetInfo={setResetInfo}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { categoryData: state.ruleCategoryReducer };
};
export default connect(mapStateToProps, { addRuleCategory,fetchRuleCategory })(Index);
