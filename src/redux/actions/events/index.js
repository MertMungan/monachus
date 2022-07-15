/* eslint-disable */
import axios from "axios";
import { headers, userHeaders } from "../../headers";

const userIdLocal = JSON.parse(localStorage.getItem("userId"));
const userRealmLocal = JSON.parse(localStorage.getItem("userRealm"));
const userUserNameLocal = JSON.parse(localStorage.getItem("userUserName"));
const userAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
const userClientIdLocal = JSON.parse(localStorage.getItem("userClientId"));

// BURASI KONTROL EDİLECEK  14-18 ARASI KALKARSA GEREKLİ BİLGİLERİ ÇEKEMİYORUZ

let userId = userIdLocal.userId;
let userRealmName = userRealmLocal.userRealm;
let userUserName = userUserNameLocal.userName;
let userToken = userAccessToken.userAccessToken;
let userClientName = userClientIdLocal.userName;

// const userHeaders = () => ({
//   'X-UserId': userIdLocal.userId,
//   'X-UserName': userUserNameLocal.userName,
//   'X-UserRealm': userRealmLocal.userRealm,
//   'X-UserAccessToken': userAccessToken.userAccessToken
// })

// AXIOS INSTANCE CREATE
const instance = axios.create({
  baseURL: process.env.REACT_APP_DEST,
  timeout: 5000,
  headers: { ...headers(), ...userHeaders() },
});
// AXIOS INSTANCE CREATE

export const fetchEvents = () => async (dispatch) => {
  const data = await instance.get(
    `/events/list`,
    {
      params: {
        userId: userId,
      },
    },
    {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    }
  );
  const eventListData = data.data.data;
  // console.log(eventListData);
  if (data) {
    dispatch({ type: "GET_FIELDS", payload: eventListData });
  } else {
    dispatch({ type: "GET_FIELDS", payload: [] });
  }
};

export const addEvents =
  (user = userId, data) =>
  async (dispatch) => {
    if (data.eventName === "") return;
    let finalEventList = [];

    const sendData = {
      userId: user,
      userRealm: userRealmName,
      userName: userUserName,
      userAccessToken: userToken,
      userClientId: userClientName,
      data: data,
    };

    const mata = await instance.post(`/events/addevent`, sendData, {
      headers: { ...headers(), ...userHeaders() },
    });
    if (mata.status === 200) {
      dispatch(fetchEvents());
    }
  };

export const updateEvents = (id, data) => async (dispatch) => {
  const eventList = await instance.get(
    `/events/list`,
    {
      params: {
        userId: userId,
      },
    },
    {
      headers: { ...headers(), ...userHeaders() },
    }
  );
  const jsoneventList = eventList.data.data;
  jsoneventList.find(function (item) {
    if (item.eventId === id) {
      if (item.fields.length === 0) {
        item.fields = [data[0]];
      } else {
        item.fields = data;
      }
    }
  });

  const response4 = await instance.put(`/events/${id}`, jsoneventList);
  const mata = await instance.get(
    `/events/list`,
    {
      params: {
        userId: userId,
      },
    },
    {
      headers: { ...headers(), ...userHeaders() },
    }
  );
  const eventListData = mata.data.data;
  dispatch(fetchEvents());
};

export const deleteEvents = (id) => async (dispatch) => {
  if (!id) {
    return null;
  } else {
    const eventList = await instance.get(
      `/events/list`,
      {
        params: {
          userId: userId,
        },
      },
      {
        headers: { ...headers(), ...userHeaders() },
      }
    );
    const jsoneventList = eventList.data.data;
    const cleaneventList = jsoneventList.filter((fact) => fact.eventId !== id);
    const response5 = await instance.delete(`/events/delete/${id}`);
    if (response5.status === 200) {
      const eventListLast = await instance.get(
        `/events/list`,
        {
          params: {
            userId: userId,
          },
        },
        {
          headers: { ...headers(), ...userHeaders() },
        }
      );
      fetchEvents();
    }
  }
};
/* eslint-disable */
