const initialState = [];

const keycloakRolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_KEYCLOAK_ROLES":
      return action.payload;
    case "CREATE_KEYCLOAK_ROLES":
      return { ...state, ...action.payload[0].data };
    default:
      return state;
  }
};

export default keycloakRolesReducer;
