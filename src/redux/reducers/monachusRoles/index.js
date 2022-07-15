const initialState = [];

const monachusRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_KEYCLOAK_USERS":
      return action.payload;
    default:
      return state;
  }
};

export default monachusRoleReducer;
