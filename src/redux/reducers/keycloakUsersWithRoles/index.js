const initialState = [];

const keycloakUsersWithRolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_KEYCLOAK_USERS_WITH_ROLES":
      return action.payload;
    default:
      return state;
  }
};

export default keycloakUsersWithRolesReducer;
