const initialState = [];

const metaDataEventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_META_EVENT_DATA":
      return action.payload;
    case "ADD_META_EVENT":
      return [...state, action.payload];
    case "DELETE_META_EVENT_DATA":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE_RULE_CATEGORY":
      var foundIndex = state.findIndex((x) => x.id === action.payload.id);
      state[foundIndex].description = action.payload.description;
      state[foundIndex].name = action.payload.name;
      state[foundIndex].metadata = action.payload.fields;
      return [...state];
    default:
      return state;
  }
};

export default metaDataEventsReducer;
