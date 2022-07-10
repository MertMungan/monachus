const initialState = {}

const treeConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONFIG':
      return action.payload
    case 'ADD_CONFIG':
      return action.payload
    case 'UPDATE_CONFIG':
      return action.payload
    case 'REMOVE_CONFIG':
      return initialState
    default:
      return state
  }
}

export default treeConfigReducer
