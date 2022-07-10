const initialState = []

const recommeditionItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ITEMDATA':
        return action.payload  
    default:
        return state
  }
}

export default recommeditionItemsReducer