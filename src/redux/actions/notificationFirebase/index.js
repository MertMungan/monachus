import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.REACT_APP_NOTIFO,
});
export const fetchFirebaseData = () => async (dispatch) => {
  const data = await instance.get(
    `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/integrations`,

    {
      headers: {
        Accept: "application/json",
        ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        userId: "makifizgi@gmail.com",
      },
    }
  );
  if (data) {
    dispatch({ type: "FETCH_FIREBASE_DATA", payload: data.data });
  } else {
    dispatch({ type: "FETCH_FIREBASE_DATA", payload: [] });
  }
};

export const addFirebaseData =
  (firebaseData = []) =>
  async (dispatch) => {
    var data = JSON.stringify({
      type: "Firebase",
      properties: {
        projectId: `${firebaseData.projectID}`,
        credentials: `${firebaseData.credentials}`,
      },
      enabled: firebaseData.testMode,
      test: firebaseData.conditionEnable,
      Condition: `${firebaseData.condition}`,
      priority: `${firebaseData.priority}`,
    });

    const response = await instance.post(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/integration`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          UserId: "makifizgi@gmail.com",
          ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        },
      }
    );
    if (response) {
      dispatch(fetchFirebaseData());
    }
  };

export const updateFirebaseData =
  (firebaseData = [], firebaseId = "") =>
  async (dispatch) => {
    firebaseData = { ...firebaseData, id: firebaseId };
    var data = JSON.stringify({
      type: "Firebase",
      properties: {
        projectId: `${firebaseData.projectID}`,
        credentials: `${firebaseData.credentials}`,
      },
      enabled: firebaseData.testMode,
      test: firebaseData.conditionEnable,
      Condition: `${firebaseData.condition}`,
      priority: `${firebaseData.priority}`,
    });

    const response = await instance.put(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/integrations/${firebaseId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
          userId: "makifizgi@gmail.com",
        },
      }
    );
    if (response) {
      dispatch({ type: "UPDATE_FIREBASE_DATA", payload: firebaseData });
    }
  };

export const deleteFirebaseData =
  (firebaseId = "") =>
  async (dispatch) => {
    const response = await instance.delete(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/integrations/${firebaseId}`,
      {
        headers: {
          Accept: "application/json",
          userId: "makifizgi@gmail.com",
          ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        },
      }
    );
    if (response) {
      dispatch(fetchFirebaseData());
    }
  };
