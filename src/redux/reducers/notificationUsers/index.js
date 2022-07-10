const initialState = [];

const notificationUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_DATA":
      return action.payload.items;
    case "ADD_USERS_DATA":
      return [...state, action.payload[0]];
    case "UPDATE_USERS_DATA":
      const index = state.findIndex((item) => item.id === action.payload[0].id);
      state[index] = action.payload[0];
      return [...state];
    case "DELETE_USERS_DATA":
      const index2 = state.findIndex((item) => item.id === action.payload);
      state.splice(index2, 1);
      return [...state];
    default:
      return state;
  }
};

export default notificationUsersReducer;
