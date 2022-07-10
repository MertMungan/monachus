export const addUser =
  (userData = []) =>
  async (dispatch, getState) => {
    if (userData) {
      // console.log("userData", userData);
      dispatch({ type: "ADD_USER", payload: userData });
    }
  };

  export const fetchUsers = () =>
async (dispatch, getState) => {
  let testRed = getState().usersReducer
  if (testRed) {
        dispatch({ type: "FETCH_USER", payload: testRed });
      }
}
