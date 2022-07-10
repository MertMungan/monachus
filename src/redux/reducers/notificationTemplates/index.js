const initialState = [];

const notificationTemplatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_NOTIFICATION_TEMPLATES":
      return action.payload.items;
    case "ADD_TEMPLATES_DATA":
      return [...state, action.payload[0]];
    case "UPDATE_TEMPLATES_DATA":
      const index = state.findIndex(
        (item) => item.code === action.payload.code
      );
      state[index] = action.payload;
      return [...state];
    case "DELETE_TEMPLATES_DATA":
      const filteredTemplates = state.filter(
        (item) => item.code !== action.payload
      );
      return [...filteredTemplates];
    default:
      return state;
  }
};

export default notificationTemplatesReducer;
