import axios from "axios";
var qs = require('qs');

export const fetchKeycloakToken = () => async (dispatch, getState) => {
  var data = qs.stringify({
    'client_id': 'auth-monachus',
    'username': 'oguz',
    'password': 'oguz',
    'grant_type': 'password'
  });
  var config = {
    method: 'post',
    url: 'https://apps.belgesakla.com/auth/realms/Monachus/protocol/openid-connect/token',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    dispatch({ type: "FETCH_KEYCLOAK_TOKEN", payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
}

