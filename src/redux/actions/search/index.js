import axios from "axios";
import { headers, userHeaders } from "../../headers";
import { initialState } from "./utils";
import { toast } from "react-toastify";
const instance = axios.create({
  baseURL: process.env.REACT_APP_DEST,
  timeout: 5000,
  headers: { ...headers(), ...userHeaders() },
});

export const fetchSearch = () => async (dispatch) => {
  const response = await JSON.parse(localStorage.getItem("searchConfig"));
  if (response) {
    dispatch({ type: "GET_SEARCH", payload: response });
  } else {
    dispatch({ type: "GET_SEARCH", payload: initialState });
  }
};

export const addSearch =
  (configData = {}, userRealm = "") =>
  async (dispatch) => {
    localStorage.setItem("searchConfig", JSON.stringify(configData));
    const response = await JSON.parse(localStorage.getItem("searchConfig"));
    if (response) {
      dispatch({ type: "ADD_SEARCH", payload: response });
    } else {
      toast.error("Couldn't add search");
    }
  };
