const initialState = []

const collectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COLLECTION':
      return action.payload
    case 'ADD_COLLECTION':
      return [...state, action.payload]
    case 'REMOVE_COLLECTION':
      return [...state.filter((item) => item !== action.payload)]
    default:
      return state
  }
}

export default collectionsReducer
