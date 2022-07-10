export const addRuleCategory = (ruleCategoryData = []) =>
async (dispatch, getState) => {
    if (ruleCategoryData) {
        dispatch({ type: "ADD_RULE_CATEGORY", payload: ruleCategoryData });
      }
}

export const fetchRuleCategory = () =>
async (dispatch, getState) => {
  let testRed = getState().collectionsReducer
  if (testRed) {
        dispatch({ type: "FETCH_RULE_CATEGORY", payload: testRed });
      }
}