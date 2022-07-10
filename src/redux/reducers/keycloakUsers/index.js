const initialState = [];

const keycloakUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_KEYCLOAK_USERS":
      return action.payload;
    default:
      return state;
  }
};

export default keycloakUsersReducer;
