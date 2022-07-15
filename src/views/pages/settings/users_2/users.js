import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import UsersTable from "./UsersTable";
import Wizard from "@components/wizard";
import uuid from "react-uuid";
import UserFirstStep from "./UserFirstStep";
import Breadcrumbs from "@components/breadcrumbs";
import { addUser } from "../../../../redux/actions/users";
import { fetchKeycloakUsers } from "../../../../redux/actions/keycloakUsers";

export const Users = ({
  addUser = () => {},
  fetchKeycloakUsers = () => {},
  keycloakToken = [],
}) => {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [stepper, setStepper] = useState(null);
  const ref = useRef(null);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userEmail: "",
    userRoles: "",
    userContact: "",
    userPermissions: {
      dashboards: { CRUD: false },
      cep: { CRUD: false },
      dataFlow: { CRUD: false },
      settings: { CRUD: false },
    },
  });
  const [resetInfo, setResetInfo] = useState({
    userId: "",
    userName: "",
    userEmail: "",
    userRoles: "",
    userContact: "",
  });

  const handleUserFirstStep = (name, email, roles, contact) => {
    if (userInfo.userId) {
      setUserInfo({
        userId: uuid(),
        userName: name,
        userEmail: email,
        userRoles: roles || "",
        userContact: contact,
      });
    } else {
      setUserInfo({
        userId: uuid(),
        userName: name,
        userEmail: email,
        userRoles: roles || "",
        userContact: contact,
      });
    }
  };

  useEffect(() => {
    /*     fetchKeycloakUsers(); */
  }, []);

  console.log("keycloakToken", keycloakToken);

  const steps = [
    {
      id: "user-details",
      title: "User Details",
      subtitle: "Enter Details For Your User",
      content: (
        <UserFirstStep
          setUserFirstStep={handleUserFirstStep}
          stepper={stepper}
          type="wizard-horizontal"
          resetName={resetInfo.userName}
          resetEmail={resetInfo.userEmail}
          resetRoles={resetInfo.userRoles}
          resetContact={resetInfo.userContact}
          resetInfo={resetInfo}
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
        />
      ),
    },
  ];

  useEffect(() => {
    if (
      userInfo.userId !== "" &&
      userInfo.userName !== "" &&
      userInfo.userEmail !== "" &&
      userInfo.userContact !== ""
    ) {
    }
  }, [userInfo]);
  return (
    <Fragment>
      <Breadcrumbs breadCrumbParent="CEP" breadCrumbActive="Users" />

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
          <UsersTable
            setWizardOpen={setWizardOpen}
            wizardOpen={wizardOpen}
            setResetInfo={setResetInfo}
          />
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userList: state.usersReducer,
  keycloakUserList: state.keycloakUsersReducer,
  keycloakToken: state.keycloakTokenReducer,
});

export default connect(mapStateToProps, {
  addUser,
  fetchKeycloakUsers,
})(Users);
