const initialState = [];

const ruleCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RULE_CATEGORY":
      return [...state, action.payload];
    case "FETCH_RULE_CATEGORY":
      return action.payload;
    case "DELETE_RULE_CATEGORY":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE_CATEGORY":
      var foundIndex = state.findIndex(x => x.id === action.payload.id);
      state[foundIndex].description = action.payload.description
      state[foundIndex].name = action.payload.name
      return [...state]
    default:
      return state;
  }
};

export default ruleCategoryReducer;
