const initialState = [];

const metaDataRulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_META_RULE_DATA":
      return action.payload;
    case "ADD_META_RULE":
      return [...state, action.payload];
    case "DELETE_META_RULE_DATA":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE_RULE_CATEGORY":
      var foundIndex = state.findIndex((x) => x.id === action.payload.id);
      state[foundIndex].description = action.payload.description;
      state[foundIndex].name = action.payload.name;
      state[foundIndex].assignedCategory = action.payload.assignedCategory;
      state[foundIndex].builderInfo[0] = action.payload.builderInfo[0];
      state[foundIndex].builderInfo[1] = action.payload.builderInfo[1];
      state[foundIndex].assignedEvent = action.payload.assignedEvent;
      return [...state];
    default:
      return state;
  }
};

export default metaDataRulesReducer;
