import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import BreadCrumbs from '@components/breadcrumbs'

import RoleCards from "./RoleCards";
import UsersTable from "./UsersTable";
export const Users = (props) => {
  return (
    <Fragment>
      <BreadCrumbs breadCrumbParent='Settings' breadCrumbActive='Users' />

      <h3>Roles List</h3>
      <RoleCards />
      <h3 className="mt-50">Total users with their roles</h3>
      <p className="mb-2">
        Find all of your company’s administrator accounts and their associate
        roles.
      </p>
      <div className="app-user-list">
        <UsersTable />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
