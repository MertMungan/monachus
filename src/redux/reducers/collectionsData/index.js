const initialState = [];

const collectionsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COLLECTIONSDATA":
      return action.payload;

    case "ADD_COLLECTIONSDATA":
      return { ...state, ...action.payload[0].data };
    default:
      return state;
  }
};

export default collectionsDataReducer;
