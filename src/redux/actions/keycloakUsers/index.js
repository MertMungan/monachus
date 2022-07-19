import axios from "axios";

export const getUserWithClientRoles = () => async (dispatch, getState) => {
  const currentUsers = getState().keycloakUsersReducer;
  let usersWithClientRoles = [];
  const bearerToken = JSON.parse(
    localStorage.getItem("userAccessToken")
  ).userAccessToken;
  for (let index = 0; index < currentUsers.length; index++) {
    var config = {
      method: "get",
      url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/users/${currentUsers[index].id}/role-mappings`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    let userAllRoles = await axios(config);
    if (userAllRoles?.data?.clientMappings) {
      // console.log(
      //   "userAllRoles.clientMappings",
      //   userAllRoles?.data?.clientMappings["auth-monachus"]
      // );
      usersWithClientRoles.push({
        user: currentUsers[index],
        userRoles: userAllRoles?.data?.clientMappings["auth-monachus"],
      });
    }
  }
  dispatch({
    type: "FETCH_KEYCLOAK_USERS_WITH_ROLES",
    payload: usersWithClientRoles,
  });
};

export const fetchKeycloakUsers = () => async (dispatch, getState) => {
  const bearerToken = JSON.parse(
    localStorage.getItem("userAccessToken")
  ).userAccessToken;

  var config = {
    method: "get",
    url: "https://apps.belgesakla.com/auth/admin/realms/Monachus/users",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      dispatch({ type: "FETCH_KEYCLOAK_USERS", payload: response.data });
      dispatch(getUserWithClientRoles());
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getRealmClients = async () => {
  const bearerToken = JSON.parse(
    localStorage.getItem("userAccessToken")
  ).userAccessToken;

  var config = {
    method: "get",
    url: "https://apps.belgesakla.com/auth/admin/realms/Monachus/clients",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  const tesAMK = await axios(config);
  if (tesAMK) return tesAMK.data;
};

export const fetchKeycloakUsersClientRoles =
  () => async (dispatch, getState) => {
    const allClientofRealm = await getRealmClients();
    let realmClients = allClientofRealm;
    let choosenClient = {};
    const bearerToken = JSON.parse(
      localStorage.getItem("userAccessToken")
    ).userAccessToken;

    const ClientName = JSON.parse(
      localStorage.getItem("userClientId")
    ).userName;
    if (realmClients?.length > 0) {
      choosenClient = realmClients.find(
        (client) => client.clientId === ClientName
      );

      var config = {
        method: "get",
        url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/clients/${choosenClient.id}/roles`,
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: "FETCH_KEYCLOAK_CLIENT_ROLES",
            payload: response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

export const fetchKeycloakUsersByMail = async (keycloakUserMail = "") => {
  const bearerToken = JSON.parse(
    localStorage.getItem("userAccessToken")
  ).userAccessToken;

  var config = {
    method: "get",
    url: "https://apps.belgesakla.com/auth/admin/realms/Monachus/users",
    Authorization: `Bearer ${bearerToken}`,
  };
  // console.log("config: ", config);

  const getCreatedUserData = await axios(config);
  if (getCreatedUserData) {
    return getCreatedUserData.data;
  }
};

export const deleteKeycloakUser =
  (keycloakUserId = "") =>
  async (dispatch, getState) => {
    const bearerToken = JSON.parse(
      localStorage.getItem("userAccessToken")
    ).userAccessToken;

    var config = {
      method: "delete",
      url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/users/${keycloakUserId}`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        dispatch(fetchKeycloakUsers());
      })
      .catch(function (error) {
        console.log(error);
      });
  };

export const addClientRoleToUser =
  (userId = "", keycloakRoleData = []) =>
  async (dispatch, getState) => {
    const bearerToken = JSON.parse(
      localStorage.getItem("userAccessToken")
    ).userAccessToken;
    var data = JSON.stringify(keycloakRoleData);
    const userClient = localStorage.getItem("ClientName_Id");
    var config = {
      method: "post",
      url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/users/${userId}/role-mappings/clients/${userClient}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      data: data,
    };

    const isRolesAdded = await axios(config);
    if (isRolesAdded) {
      // console.log("isRolesAdded: ", isRolesAdded);
      dispatch(fetchKeycloakUsers());
    }
  };

export const createKeycloakUser =
  (keycloakUserData = [], roles = []) =>
  async (dispatch, getState) => {
    const bearerToken = JSON.parse(
      localStorage.getItem("userAccessToken")
    ).userAccessToken;

    var data = JSON.stringify({
      username: keycloakUserData.userName,
      enabled: true,
      totp: false,
      emailVerified: true,
      firstName: keycloakUserData.firstName,
      lastName: keycloakUserData.lastName,
      email: keycloakUserData.userEmail,
      disableableCredentialTypes: [],
      requiredActions: [],
      notBefore: 0,
      access: {
        manageGroupMembership: true,
        view: true,
        mapRoles: true,
        impersonate: true,
        manage: true,
      },
      credentials: [
        {
          type: "password",
          value: keycloakUserData.userPassword,
          temporary: false,
        },
      ],
      realmRoles: ["mb_user"],
    });

    var config = {
      method: "post",
      url: "https://apps.belgesakla.com/auth/admin/realms/Monachus/users",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      data: data,
    };
    const isUserCreated = await axios(config);
    let userId = "";
    if (isUserCreated) {
      userId =
        isUserCreated.headers.location.split("/")[
          isUserCreated.headers.location.split("/").length - 1
        ];

      const clientRoles = getState().keycloakRolesClinetReducer;

      let keycloakRoleData = [];

      for (let index = 0; index < roles.length; index++) {
        for (let minedx = 0; minedx < clientRoles.length; minedx++) {
          if (roles[index] === clientRoles[minedx].name) {
            keycloakRoleData.push(clientRoles[minedx]);
          }
        }
      }
      dispatch(addClientRoleToUser(userId, keycloakRoleData));
    }
  };

export const updateKeycloakUser =
  (userId = "", keycloakUserData = []) =>
  async (dispatch, getState) => {
    const bearerToken = JSON.parse(
      localStorage.getItem("userAccessToken")
    ).userAccessToken;

    var data = JSON.stringify({
      username: keycloakUserData.userName,
      enabled: true,
      totp: false,
      emailVerified: true,
      firstName: keycloakUserData.firstName,
      lastName: keycloakUserData.lastName,
      email: keycloakUserData.userEmail,
      disableableCredentialTypes: [],
      requiredActions: [],
      notBefore: 0,
      access: {
        manageGroupMembership: true,
        view: true,
        mapRoles: true,
        impersonate: true,
        manage: true,
      },
      credentials: [
        {
          type: "password",
          value: keycloakUserData.userPassword,
          temporary: false,
        },
      ],
      realmRoles: ["mb_user"],
    });

    var config = {
      method: "put",
      url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/users/${userId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      data: data,
    };
    const isUserUpdated = await axios(config);
    /*
     * AFTER USER'S DETAILS OTHER THAN ROLES ARE UPDATED, NOW WE HAVE TO UPDATE ROLES
     */

    if (isUserUpdated) {
      // first get the current mappings for the user

      // get the updated user's id
      let configUserId =
        isUserUpdated.config.url.split("/")[
          isUserUpdated.config.url.split("/").length - 1
        ];

      var config = {
        method: "get",
        url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/users/${configUserId}/role-mappings`,
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      };
      let userAllRoles = await axios(config);
      if (userAllRoles?.data?.clientMappings) {
        // for each role in keycloakUserData?.roles, check if matches with any of the  userAllRoles?.data?.clientMappings["auth-monachus"]?.mappings element's name
        // if matches, delete the mapping first and then add new mapping
        // if not, add new mapping
        for (let index = 0; index < keycloakUserData?.roles?.length; index++) {
          for (
            let minedx = 0;
            minedx <
            userAllRoles?.data?.clientMappings["auth-monachus"]?.mappings
              .length;
            minedx++
          ) {
            // console.log(
            //   "keycloakUserData?.roles[index]: ",
            //   userAllRoles?.data?.clientMappings["auth-monachus"]?.mappings[
            //     minedx
            //   ]
            // );
            if (
              userAllRoles?.data?.clientMappings["auth-monachus"]?.mappings[
                minedx
              ].name === keycloakUserData?.roles[index]
            ) {
              const clientId = localStorage.getItem("ClientName_Id");

              // first delete userAllRoles?.data?.clientMappings["auth-monachus"]?.mappings[minedx]
              var config = {
                method: "delete",
                url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/users/${configUserId}/role-mappings/clients/${clientId}`,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${bearerToken}`,
                },
                data: [
                  userAllRoles?.data?.clientMappings["auth-monachus"]?.mappings[
                    minedx
                  ],
                ],
              };
              let deleted = await axios(config);
              // console.log(deleted);
              if (deleted) {
                const userClient = localStorage.getItem("ClientName_Id");
                // then add userAllRoles?.data?.clientMappings["auth-monachus"]?.mappings[minedx]
                var config = {
                  method: "post",
                  url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/users/${configUserId}/role-mappings/clients/${userClient}`,
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                  },
                  data: [
                    userAllRoles?.data?.clientMappings["auth-monachus"]
                      ?.mappings[minedx],
                  ],
                };
                let added = await axios(config);
                // console.log(added);
                if (added) {
                  dispatch(fetchKeycloakUsers());
                }
              }
            } else {
              // delete the mapping first and then add new mapping
              const clientRoles = getState().keycloakRolesClinetReducer;

              let keycloakRoleData = [];

              for (
                let index = 0;
                index < keycloakUserData?.roles?.length;
                index++
              ) {
                for (let minedx = 0; minedx < clientRoles.length; minedx++) {
                  if (
                    keycloakUserData?.roles[index] === clientRoles[minedx].name
                  ) {
                    keycloakRoleData.push(clientRoles[minedx]);
                  }
                }
              }
              const userClient = localStorage.getItem("ClientName_Id");

              var config = {
                method: "delete",
                url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/users/${configUserId}/role-mappings/clients/${userClient}`,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${bearerToken}`,
                },
                data: [
                  userAllRoles?.data?.clientMappings["auth-monachus"]?.mappings[
                    minedx
                  ],
                ],
              };
              let deleted = await axios(config);
              // console.log(deleted);
              if (deleted) {
                var config = {
                  method: "post",
                  url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/users/${configUserId}/role-mappings/clients/${userClient}`,
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                  },
                  data: keycloakRoleData,
                };

                let newAdded = await axios(config);
                // console.log("newAdded", newAdded);

                if (newAdded) {
                  dispatch(fetchKeycloakUsers());
                }
              }
            }
          }
        }
      }
    }
  };
