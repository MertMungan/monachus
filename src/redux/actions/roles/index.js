export const addRole =
  (roleData = []) =>
  async (dispatch, getState) => {
    if (roleData) {
      // console.log("userData", roleData);
      dispatch({ type: "ADD_ROLE", payload: roleData });
    }
  };

  export const fetchRoles = () =>
async (dispatch, getState) => {
  let testRed = getState().rolesReducer
  if (testRed) {
        dispatch({ type: "FETCH_ROLE", payload: testRed });
      }
}
