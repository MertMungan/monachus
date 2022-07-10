import axios from "axios";

export const fetchRecommeditionUsers = () => async (dispatch, getState) => {
  axios.get("/api/mata/initial-data")
      .then(({ data }) => {
        dispatch({ type: 'GET_USERDATA', payload: data })
      })
}
