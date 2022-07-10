import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.REACT_APP_NOTIFO,
});

export const addEmailTemplateData =
  (templateData = []) =>
  async (dispatch, getState) => {
    var data = JSON.stringify({
      kind: "ut",
    });

    const response = await instance.post(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/email-templates`,
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
export const updateEmailTemplateData =
  (templateData = [], id = "") =>
  async (dispatch, getState) => {
    var data = JSON.stringify({
      name: `${templateData.condition}`,
      primary: true,
      languages: {
        in_5b: {
          subject: "labore Ut in",
          bodyHtml: "quis",
          bodyText: "esse magna ex minim",
          fromEmail: "culpa ea Excepteur officia deserunt",
          fromName: "pariatur laborum id nostrud",
          kind: "fugiat laborum non ut",
        },
      },
    });

    const response = await instance.put(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/email-templates/${id}`,
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
      dispatch({ type: "UPDATE_EMAILTEMPLATES", payload: response.data });
    }
  };

export const fetchEmailTemplateData = () => async (dispatch) => {
  const data = await instance.get(
    `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/email-templates`,

    {
      headers: {
        Accept: "application/json",
        ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        userId: "makifizgi@gmail.com",
      },
    }
  );

  if (data) {
    dispatch({ type: "FETCH_EMAILTEMPLATESDATA", payload: data.data.items });
  } else {
    dispatch({ type: "FETCH_EMAILTEMPLATESDATA", payload: [] });
  }
};

export const deleteEmailTemplateData = (id) => async (dispatch) => {
  const data = await instance.delete(
    `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/email-templates/${id}`,
    {
      headers: {
        Accept: "application/json",
        userId: "makifizgi@gmail.com",
        ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
      },
    }
  );

  if (data) {
    dispatch(fetchEmailTemplateData());
  }
};
