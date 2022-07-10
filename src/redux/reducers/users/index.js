const initialState = []


const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
        return [...state, action.payload];
    case 'FETCH_USER':
        return action.payload;
    default:
      return state
  }
}

export default usersReducer