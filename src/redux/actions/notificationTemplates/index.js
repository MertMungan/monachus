import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_NOTIFO,
});

export const fetchNotificationTemplates = () => async (dispatch) => {
  const response = await instance.get(
    `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/templates`,
    {
      headers: {
        Accept: "application/json",
        ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        UserId: "makifizgi@gmail.com",
      },
    }
  );

  if (response) {
    dispatch({
      type: "FETCH_NOTIFICATION_TEMPLATES",
      payload: response.data,
    });
  }
};

export const addTemplateData =
  (templateData = {}) =>
  async (dispatch) => {
    // console.log("templateData", templateData);
    var data = JSON.stringify({
      requests: [
        {
          code: `${templateData.code}`,
          formatting: {
            subject: {
              en: `${templateData.subject}`,
            },
            body: {
              en: `${templateData.body}`,
            },
            confirmText: {
              en: `${templateData.confirmText}`,
            },
            imageSmall: {
              en: "https://i.picsum.photos/id/121/200/300.jpg?hmac=2fXySXN_YXZfcWVqSvYNuH7podc4E9cEj89RqtBW238",
            },
            imageLarge: {
              en: "https://i.picsum.photos/id/121/200/300.jpg?hmac=2fXySXN_YXZfcWVqSvYNuH7podc4E9cEj89RqtBW238",
            },
            linkUrl: {
              en: `${templateData.linkUrl}`,
            },
            linkText: {
              en: `${templateData.linkText}`,
            },
            confirmMode: `${templateData.confirmMode}`,
          },
          settings: {
            email: {
              send: `${templateData.emailSend}`,
              condition: "Always",
              delayInSeconds: 1,
              template: `${templateData.emailTemplates}`,
              properties: {
                fromEmail: `${templateData.fromEmail}`,
                fromName: `${templateData.fromName}`,
              },
            },
            messaging: {
              send: `${templateData.messagingSend}`,
              condition: "Always",
              delayInSeconds: 4,
              template: `${templateData.messagingTemplates}`,
              properties: null,
            },
          },
        },
      ],
    });

    const response = await instance.post(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/templates`,
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
      dispatch({
        type: "ADD_TEMPLATES_DATA",
        payload: response.data,
      });
    }
  };

export const updateTemplateData =
  (templateData = {}) =>
  async (dispatch) => {
    var data = JSON.stringify({
      requests: [
        {
          code: `${templateData.code}`,
          formatting: {
            subject: {
              en: `${templateData.subject}`,
            },
            body: {
              en: `${templateData.body}`,
            },
            confirmText: {
              en: `${templateData.confirmText}`,
            },
            imageSmall: {
              en: "https://i.picsum.photos/id/121/200/300.jpg?hmac=2fXySXN_YXZfcWVqSvYNuH7podc4E9cEj89RqtBW238",
            },
            imageLarge: {
              en: "https://i.picsum.photos/id/121/200/300.jpg?hmac=2fXySXN_YXZfcWVqSvYNuH7podc4E9cEj89RqtBW238",
            },
            linkUrl: {
              en: `${templateData.linkUrl}`,
            },
            linkText: {
              en: `${templateData.linkText}`,
            },
            confirmMode: `${templateData.confirmMode}`,
          },
          settings: {
            // "email": {
            //   "send": `${templateData.emailSend}`,
            //   "condition": `${templateData.emailWhen}`,
            //   "delayInSeconds": parseInt(templateData.emailSec),
            //   "template": `${templateData.emailTemplates}`,
            //   "properties": {
            //     "fromEmail": `${templateData.fromEmail}`,
            //     "fromName": `${templateData.fromName}`,
            //   },
            // },
            //   "sms": {
            //     "send": `${templateData.smsSend}`,
            //     "condition": `${templateData.smsWhen}`,
            //     "delayInSeconds": parseInt(templateData.smsSec),
            //     "template": `${templateData.smsTemplates}`,
            //     "properties": null
            // },
          },
        },
      ],
    });

    const response = await instance.post(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/templates`,
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
      dispatch(fetchNotificationTemplates());
    }
  };

export const deleteTemplateData =
  (templateCode = "") =>
  async (dispatch) => {
    const response = await instance.delete(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/templates/${templateCode}`,
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
      dispatch({
        type: "DELETE_TEMPLATES_DATA",
        payload: templateCode,
      });
    }
  };
