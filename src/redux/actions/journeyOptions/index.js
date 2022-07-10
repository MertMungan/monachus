export const fetchJourneyOptions = () => async (dispatch, getState) => {
  let testRed = getState().journeyOptionsReducer;

  if (testRed) {
    dispatch({
      type: "GET_JOURNEY_OPTIONS_DATA",
      payload: testRed,
    });
  }
};
export const addJourneyOptions = (journey) => async (dispatch, getState) => {
  // add journey to journeyOptionsReducer's state
  let newJourney = [...getState().journeyOptionsReducer, journey];
  dispatch({
    type: "ADD_JOURNEY_OPTIONS_DATA",
    payload: newJourney,
  });
};

export const updateJourneyOptions =
  (targetNode, journey) => async (dispatch) => {
    // first find the target node in journeyOptionsReducer's state
    let targetNodeIndex = journey.findIndex((node) => {
      return node.label === targetNode.label;
    });
    // then update the target node in journeyOptionsReducer's state
    let newJourney = [...journey];
    newJourney[targetNodeIndex] = targetNode;
    dispatch({
      type: "UPDATE_JOURNEY_OPTIONS_DATA",
      payload: newJourney,
    });
  };
