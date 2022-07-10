const initialState = [];

const notificationEmailTemplatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EMAILTEMPLATESDATA":
      return [...state, action.payload];
    case "UPDATE_EMAILTEMPLATESDATA":
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index] = action.payload;
      return [...state];
    case "FETCH_EMAILTEMPLATESDATA":
      return action.payload;
    case "DELETE_EMAILTEMPLATESDATA":
    default:
      return state;
  }
};

export default notificationEmailTemplatesReducer;
