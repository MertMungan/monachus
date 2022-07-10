const initialState = []


const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ROLE':
        return [...state, action.payload];
    case 'FETCH_ROLE':
        return action.payload;
    default:
      return state
  }
}

export default rolesReducer