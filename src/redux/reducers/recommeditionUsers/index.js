const initialState = []

const recommeditionUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERDATA':
        return action.payload  
    default:
        return state
  }
}

export default recommeditionUsersReducer