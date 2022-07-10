const initialState = []

const fieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FIELDS':
      return action.payload
    case 'ADD_EVENTS':
      return [...state, action.payload]
    case 'UPDATE_EVENTS':
      return action.payload
    case 'REMOVE_EVENTS':
      return action.payload
    default:
      return state
  }
}

export default fieldReducer
