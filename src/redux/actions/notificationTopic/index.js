import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.REACT_APP_NOTIFO,
});

export const fetchTopicData = () => async (dispatch) => {
  const response = await instance.get(
    `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/topics`,
    {
      headers: {
        Accept: "application/json",
        ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        UserId: "makifizgi@gmail.com",
      },
    }
  );

  if (response) {
    let items = response.data.items;
    dispatch({ type: "FETCH_TOPIC_DATA", payload: items });
  }
};

export const addTopicData =
  (topicData = {}) =>
  async (dispatch) => {
    var data = JSON.stringify({
      requests: [
        {
          path: `${topicData.topicName}`,
          name: {
            en: `${topicData.name}`,
          },
          description: {
            en: `${topicData.description}`,
          },
          showAutomatically: topicData.showAuto,
          channels: {
            email: `${topicData.email}`,
            sms: `${topicData.sms}`,
            messaging: `${topicData.messaging}`,
            mobilePush: `${topicData.mobilePush}`,
            webPush: `${topicData.webPush}`,
            /*             webhook: `${topicData.webhook}`,
             */
          },
        },
      ],
    });
    const response = await instance.post(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/topics`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          userId: "makifizgi@gmail.com",
          ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        },
      }
    );

    if (response) {
      dispatch({ type: "ADD_DATA", payload: response.data });
    }
  };

export const updateTopicData =
  (topicData = {}) =>
  async (dispatch) => {
    var data = JSON.stringify({
      requests: [
        {
          path: `${topicData.topicName}`,
          name: {
            en: `${topicData.name}`,
          },
          description: {
            en: `${topicData.description}`,
          },
          showAutomatically: topicData.showAuto,
          channels: {
            email: `${topicData.email}`,
            sms: `${topicData.sms}`,
            messaging: `${topicData.messaging}`,
            mobilePush: `${topicData.mobilePush}`,
            webPush: `${topicData.webPush}`,
            /*    webhook: `${topicData.webhook}`, */
          },
        },
      ],
    });

    const response = await instance.post(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/topics`,
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
      dispatch({ type: "UPDATE_DATA", payload: response.data });
    }
  };

export const deleteTopicData = (topic) => async (dispatch) => {
  const response = await instance.delete(
    `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/topics/${topic}`,
    {
      headers: {
        Accept: "application/json",
        UserId: "makifizgi@gmail.com",
        ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
      },
    }
  );

  if (response) {
    dispatch({ type: "DELETE_DATA", payload: topic });
  }
};

export const addPublishData =
  (publishData = {}) =>
  async (dispatch) => {
    var data = JSON.stringify({
      requests: [
        {
          topic: `users/${publishData.topicUserSelect}`,
          creatorId: "mert",
          templateCode: `${publishData.templateSelect}`,
          data: `${publishData.data}`,
          timestamp: "1975-07-21T13:53:18.473Z",
          preformatted: {
            subject: {
              text: `${publishData.subject}`,
            },
            body: {
              text: `${publishData.body}`,
            },
            confirmText: {
              text: `${publishData.confirmText}`,
            },
            imageSmall: {
              img: "https://i.imgur.com/XQQZRQY.png",
            },
            imageLarge: {
              img: "https://i.imgur.com/XQQZRQY.png",
            },
            linkUrl: {
              link: `${publishData.linkUrl}`,
            },
            linkText: {
              text: `${publishData.linkText}`,
            },
            confirmMode: `${publishData.confirmMode}`,
          },
          settings: {
            sms: {
              send: `${publishData.smsSend}`,
              condition: "Always",
              delayInSeconds: parseInt(publishData.smsSec),
              template: `${publishData.topicSmsSelect}`,
              properties: null,
            },
            email: {
              send: `${publishData.emailSend}`,
              condition: "Always",
              delayInSeconds: parseInt(publishData.emailSec),
              template: `${publishData.topicEmailSelect}`,
              properties: null,
            },
          },
          properties: null,
          scheduling: {
            type: "UTC",
            nextWeekDay: null,
            date: null,
            time: "00:00:00",
          },
          silent: publishData.silent,
          test: publishData.testMode,
          timeToLiveInSeconds: parseInt(publishData.liveInSeconds),
        },
      ],
    });

    const response = await instance.post(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/events`,
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
      dispatch({ type: "ADD_PUBLISH_DATA", payload: publishData });
    }
  };
