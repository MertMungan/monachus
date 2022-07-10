import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.REACT_APP_NOTIFO,
});
export const fetchMessagingTemplates = () => async (dispatch) => {
  const response = await instance.get(
    `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/messaging-templates`,

    {
      headers: {
        Accept: "application/json",
        ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        UserId: "makifizgi@gmail.com",
      },
    }
  );
  if (response) {
    dispatch({ type: "FETCH_MESSAGING_TEMPLATES", payload: response.data });
  } else {
    dispatch({ type: "FETCH_MESSAGING_TEMPLATES", payload: [] });
  }
};

export const addMessagingTemplates =
  (templateData = {}) =>
  async (dispatch) => {
    var data = JSON.stringify({
      kind: "labore Ut",
    });

    const response = await instance.post(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/messaging-templates`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
          UserId: "makifizgi@gmail.com",
        },
      }
    );
    if (response) {
      response.data.name = "Unnamed";
      dispatch({ type: "ADD_MESSAGING_TEMPLATES", payload: response.data });
    }
  };

export const updateMessagingTemplates =
  (id, templateData = {}) =>
  async (dispatch) => {
    var data = JSON.stringify({
      name: `${templateData.name}`,
      primary: templateData.primary,
      languages: {
        en: {
          text: `${templateData.templates}`,
        },
      },
    });

    const response = await instance.put(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/messaging-templates/${id}`,
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
      // FETCH İŞLEMİ YAPILIP SONUÇTA ID BAZLI ARAMA YAPILIP PROPERTY GÜNCELLENMELİ VE EN SON DEĞER DÖNDÜRÜLMELİ

      dispatch(fetchMessagingTemplates());
    }
  };

export const deleteMessagingTemplates = (id) => async (dispatch) => {
  const response = await instance.delete(
    `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/messaging-templates/${id}`,
    {
      headers: {
        Accept: "application/json",
        ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        UserId: "makifizgi@gmail.com",
      },
    }
  );
  if (response) {
    dispatch({ type: "DELETE_MESSAGING_TEMPLATES", payload: response });
  }
};
