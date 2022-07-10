const initialState = [];

const keycloakTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_KEYCLOAK_TOKEN":
      return action.payload;
    default:
      return state;
  }
};

export default keycloakTokenReducer;
