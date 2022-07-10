const initialState = [];

const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RULE":
      return action.payload;
    case "GET_ALL_RULES":
      return action.payload;
    case "GET_RULE_ID":
      return action.payload;
    case "ADD_RULE":
      return [...state.data, action.payload]; //refactor edilmeli
    case "UPDATE_QUERY":
      return action.payload;
    case "REMOVE_RULE":
      return initialState;
    default:
      return state;
  }
};

export default queryReducer;
