import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import UsersTable from "./UsersTable";
import UsersTableTwo from "./UsersTableTwo";
import Wizard from "@components/wizard";
import uuid from "react-uuid";
import RoleFirstStep from "./RoleFirstStep";
import RoleSecondStep from "./RoleSecondStep";
import { addRole, fetchRoles } from "../../../../redux/actions/roles";
import {fetchKeycloakRoles} from "../../../../redux/actions/keycloakRoles"
import BreadCrumbs from "@components/breadcrumbs";

export const Roles = ({
  rolesList = [],
  addRole = () => {},
  fetchRoles = () => {},
  fetchKeycloakRoles = () => {},
  keycloakRolesList = []

}) => {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [stepper, setStepper] = useState(null);
  const [TableRoles, setTableRoles] = useState([]);
  const ref = useRef(null);
  const [roleInfo, setRoleInfo] = useState({
    roleId: "",
    roleName: "",
    roleDescription: "",
  });

  const [resetInfo, setResetInfo] = useState({
    roleId: "",
    roleName: "",
    roleDescription: "",
    rolePermissions: {
      dashboardsCRUD: false,
      cepCRUD: false,
      settingsCRUD: false,
      dataFlowCRUD: false,
    },
  });

  const handleRoleFirstStep = (name, desc) => {
    if (roleInfo.roleId) {
      setRoleInfo({
        roleId: uuid(),
        roleName: name,
        roleDescription: desc,
      });
    } else {
      setRoleInfo({
        roleId: uuid(),
        roleName: name,
        roleDescription: desc,
      });
    }
  };

  const handleRoleSecondStep = (permissions) => {
    if (roleInfo.roleId) {
      setRoleInfo({
        roleId: roleInfo.roleId,
        roleName: roleInfo.roleName,
        roleDescription: roleInfo.roleDescription,
        rolePermissions: permissions,
      });
    } else {
      setRoleInfo({
        roleId: roleInfo.roleId,
        roleName: roleInfo.roleName,
        roleDescription: roleInfo.roleDescription,
        rolePermissions: permissions,
      });
    }
  };

  const steps = [
    {
      id: "role-details",
      title: "Role Details",
      subtitle: "Enter Details For Your Role",
      content: (
        <RoleFirstStep
          setRoleFirstStep={handleRoleFirstStep}
          stepper={stepper}
          type="wizard-horizontal"
          resetName={resetInfo.roleName}
          resetDescription={resetInfo.roleDescription}
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
        />
      ),
    },
    {
      id: "role-permissions",
      title: "Permissions",
      subtitle: "Enter Permissions For Your Role",
      content: (
        <RoleSecondStep
          setRoleSecondStep={handleRoleSecondStep}
          stepper={stepper}
          type="wizard-horizontal"
          resetDashboard={resetInfo?.rolePermissions?.dashboardsCRUD}
          resetCep={resetInfo?.rolePermissions?.cepCRUD}
          resetDataFlow={resetInfo?.rolePermissions?.dataFlowCRUD}
          resetSettings={resetInfo?.rolePermissions?.settingsCRUD}
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
        />
      ),
    },
  ];

  useEffect(() => {
    fetchRoles();
    fetchKeycloakRoles();
  }, []);

  // console.log("keycloakRolesList",keycloakRolesList)

  useEffect(() => {
    if (rolesList.length > 0) {
      setTableRoles(rolesList);
    }
  }, [rolesList]);

  useEffect(() => {
    if (
      roleInfo.roleId !== "" &&
      roleInfo.roleName !== "" &&
      roleInfo.roleDescription !== "" &&
      roleInfo.rolePermissions
    ) {
      setResetInfo(roleInfo);
      addRole(roleInfo);
    }
  }, [roleInfo]);
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbParent="CEP"
        breadCrumbActive="Roles & Permissions"
      />
      <div className="app-user-list">
        {wizardOpen ? (
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
            <UsersTable
              listData={keycloakRolesList}
              setWizardOpen={setWizardOpen}
              wizardOpen={wizardOpen}
              setResetInfo={setResetInfo}
            />

            <UsersTableTwo listData={TableRoles} />
          </>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  rolesList: state.rolesReducer,
  keycloakRolesList: state.keycloakRolesReducer
});

export default connect(mapStateToProps, { addRole, fetchRoles,fetchKeycloakRoles })(Roles);
