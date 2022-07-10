import axios from "axios";
import { toast } from "react-toastify";
const instance = axios.create({
  baseURL: process.env.REACT_APP_NOTIFO,
});
export const fetchSmtpData = () => async (dispatch, getState) => {
  const response = await instance.get(
    `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/integrations`,

    {
      headers: {
        Accept: "application/json",
        ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        userId: "makifizgi@gmail.com",
      },
    }
  );
  if (response) {
    dispatch({ type: "FETCH_SMTP_DATA", payload: response.data });
  }
};

export const addSmtpData =
  (smtpData = []) =>
  async (dispatch, getState) => {
    var data = JSON.stringify({
      type: "SMTP",
      properties: {
        host: `${smtpData.host}`,
        fromEmail: `${smtpData.fromEmail}`,
        fromName: `${smtpData.fromName}`,
        port: `${smtpData.port}`,
      },
      enabled: smtpData.testMode,
      test: smtpData.conditionEnable,
      // "condition": `${firebaseData.condition}`,
      priority: `${smtpData.priority}`,
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
      dispatch(fetchSmtpData());
    }
  };

export const updateSmtpData =
  (smtpData = [], smtpId = "") =>
  async (dispatch, getState) => {
    smtpData = { ...smtpData, id: smtpId };
    var data = JSON.stringify({
      type: "SMTP",
      properties: {
        username: `${smtpData.username}`,
        password: `${smtpData.password}`,
        host: `${smtpData.host}`,
        fromEmail: `${smtpData.fromEmail}`,
        fromName: `${smtpData.fromName}`,
        port: `${smtpData.port}`,
      },
      enabled: smtpData.testMode,
      test: smtpData.conditionEnable,
      // "condition": `${SmtpData.condition}`,
      priority: `${smtpData.priority}`,
    });

    const response = await instance.put(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/integrations/${smtpId}`,
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
      dispatch({ type: "UPDATE_SMTP_DATA", payload: smtpData });
    }
  };

export const deleteSmtpData =
  (smtpId = "") =>
  async (dispatch, getState) => {
    const response = await instance.delete(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/integrations/${smtpId}`,
      {
        headers: {
          Accept: "application/json",
          userId: "makifizgi@gmail.com",
          ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        },
      }
    );
    if (response) {
      dispatch(fetchSmtpData());
    }
  };
