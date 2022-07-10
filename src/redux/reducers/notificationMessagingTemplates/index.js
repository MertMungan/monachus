const initialState = [{}];

const messagingTemplatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MESSAGING_TEMPLATES":
      return action.payload.items;
    case "ADD_MESSAGING_TEMPLATES":
      return [...state, action.payload];
    case "UPDATE_MESSAGING_TEMPLATES":
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index] = action.payload;
      return [...state];
    case "DELETE_MESSAGING_TEMPLATES":
      let url = action.payload.config.url.split("/");
      let id = url[url.length - 1];
      return state.filter((item) => item.id !== id);
    default:
      return state;
  }
};
export default messagingTemplatesReducer;
