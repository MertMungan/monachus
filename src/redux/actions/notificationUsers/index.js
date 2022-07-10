import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.REACT_APP_NOTIFO,
});
export const addUsersData =
  (UsersData = []) =>
  async (dispatch, getState) => {
    var data = JSON.stringify({
      requests: [
        {
          id: UsersData.id,
          fullName: UsersData.name,
          emailAddress: UsersData.emailAddress,
          phoneNumber: UsersData.phoneNumber,
          preferredLanguage: null,
          preferredTimezone: null,
          requiresWhitelistedTopics: false,
          properties: {},
        },
      ],
    });

    /*  var config = {
      method: "post",
      url: "https://notifo.belgesakla.com/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/users",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        UserId: "makifizgi@gmail.com",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch({ type: "ADD_USERS_DATA", payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      }); */

    const response = await instance.post(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/users`,
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
      dispatch({ type: "ADD_USERS_DATA", payload: response.data });
    }
  };

export const fetchUsersData = () => async (dispatch, getState) => {
  /*   var config = {
    method: "get",
    url: "https://notifo.belgesakla.com/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/users",
    headers: {
      Accept: "application/json",
      ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
      UserId: "makifizgi@gmail.com",
    },
  };

  axios(config)
    .then(function (response) {
      dispatch({ type: "FETCH_USERS_DATA", payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    }); */

  const response = await instance.get(
    `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/users`,
    {
      headers: {
        Accept: "application/json",
        ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        UserId: "makifizgi@gmail.com",
      },
    }
  );

  if (response) {
    dispatch({ type: "FETCH_USERS_DATA", payload: response.data });
  }
};

export const updateUsersData =
  (UsersData = []) =>
  async (dispatch, getState) => {
    var data = JSON.stringify({
      requests: [
        {
          id: UsersData.id,
          fullName: UsersData.name,
          emailAddress: UsersData.emailAddress,
          phoneNumber: null,
          preferredLanguage: null,
          preferredTimezone: null,
          requiresWhitelistedTopics: false,
          properties: {},
        },
      ],
    });

    /*  var config = {
      method: "post",
      url: "https://notifo.belgesakla.com/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/users",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        UserId: "makifizgi@gmail.com",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch({ type: "UPDATE_USERS_DATA", payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      }); */

    const response = await instance.post(
      `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/users`,
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
      dispatch({ type: "UPDATE_USERS_DATA", payload: response.data });
    }
  };

export const deleteUsersData = (id) => async (dispatch) => {
  /*  var config = {
    method: "delete",
    url: `https://notifo.belgesakla.com/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/users/${id}`,
    headers: {
      Accept: "application/json",
      ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
      UserId: "makifizgi@gmail.com",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      dispatch({ type: "DELETE_USERS_DATA", payload: id });
    })
    .catch(function (error) {
      console.log(error);
    }); */

  const response = await instance.delete(
    `/api/apps/c11e24d5-59bb-4d67-b9d3-6a12e093b924/users/${id}`,
    {
      headers: {
        Accept: "application/json",
        ApiKey: "coc07qkwzk1xmqpjoj9o4kizxcirpbjbp9atxnvsis0x",
        UserId: "makifizgi@gmail.com",
      },
    }
  );

  if (response) {
    dispatch({ type: "DELETE_USERS_DATA", payload: id });
  }
};
