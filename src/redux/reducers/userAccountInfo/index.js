const initialState = []


const userAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_INFO':
    console.log("action.payload",action.payload)
    localStorage.setItem("userInformationData", JSON.stringify(action.payload))
    case 'FETCH_USER':
        return action.payload;
    default:
      return state
  }
}

export default userAccountReducer