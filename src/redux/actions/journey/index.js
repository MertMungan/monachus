export const fetchJourney = () => async (dispatch, getState) => {
  let testRed = getState().journeyReducer;

  if (testRed) {
    dispatch({
      type: "GET_JOURNEY_DATA",
      payload: testRed,
    });
  }
};
export const addJourney = (journey) => async (dispatch) => {
  dispatch({
    type: "ADD_JOURNEY_DATA",
    payload: journey,
  });
};

export const updateJourney = (targetNode, journey) => async (dispatch) => {
  // find the targetNode in the journey and update it


  let newJourney = journey.map((node) => {
    if (node.id === targetNode.id) {
      return targetNode;
    } else {
      return node;
    }
  });
  // console.log("newJourney", newJourney);
  dispatch({
    type: "UPDATE_JOURNEY_DATA",
    payload: newJourney,
  });
};
