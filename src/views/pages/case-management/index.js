import React, { Fragment } from "react";
import { connect } from "react-redux";
import Table from "./components/Table"
import BreadCrumbs from '@components/breadcrumbs'

export const RuleManagement = (props) => {

  return (

    <Fragment>
    <BreadCrumbs breadCrumbParent='CEP' breadCrumbActive='Alerts' />
    <Table/>
    </Fragment>
    
  );
};

const mapStateToProps = (state) => ({});


export default connect(mapStateToProps, {})(RuleManagement);
