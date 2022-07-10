import axios from "axios";

export const fetchRecommeditionItems = () => async (dispatch, getState) => {
  axios.get("/api/mata/initial-items").then(({ data }) => {
    dispatch({ type: "GET_ITEMDATA", payload: data });
  });
};

export const fetchRemovedItem =
  (removedListItem = []) =>
  async (dispatch, getState) => {};
