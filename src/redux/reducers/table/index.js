const initialState = []


const tableRowsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ROWS':
      return action.payload
    default:
      return state
  }
}

export default tableRowsReducer