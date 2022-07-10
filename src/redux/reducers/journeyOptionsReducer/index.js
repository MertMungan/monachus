const initialState = [];

const journeyOptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_JOURNEY_OPTIONS_DATA":
      return action.payload;
    case "ADD_JOURNEY_OPTIONS_DATA":
      return action.payload;
    case "UPDATE_JOURNEY_OPTIONS_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default journeyOptionsReducer;
