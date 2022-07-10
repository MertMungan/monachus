const initialState = []


const ruleCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_RULE_CATEGORY':
        return [...state, action.payload];
    case 'FETCH_RULE_CATEGORY':
        return action.payload;
    default:
      return state
  }
}

export default ruleCategoryReducer