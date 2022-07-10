const initialState = [];

const keycloakRolesClinetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_KEYCLOAK_CLIENT_ROLES":
      return action.payload;
    case "CREATE_KEYCLOAK_CLIENT_ROLES":
      return { ...state, ...action.payload.data };
    default:
      return state;
  }
};

export default keycloakRolesClinetReducer;
