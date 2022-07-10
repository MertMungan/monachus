import axios from "axios";
var qs = require('qs');

export const fetchKeycloakRoles = () => async (dispatch, getState) => {
  const bearerToken =  JSON.parse(localStorage.getItem("userAccessToken")).userAccessToken
  var config = {
    method: 'get',
    url: 'https://apps.belgesakla.com/auth/admin/realms/Monachus/roles',
    headers: { 
      'Authorization': `Bearer ${bearerToken}`
      }
  };
  
  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    dispatch({ type: "FETCH_KEYCLOAK_ROLES", payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const createKeycloakRoles = (keycloakRoleDetails = []) => async (dispatch, getState) => {
  const bearerToken =  JSON.parse(localStorage.getItem("userAccessToken")).userAccessToken

  var data = JSON.stringify({
    "name": keycloakRoleDetails.roleName,
    "composite": false,
    "clientRole": false,
    "containerId": "heroes",
    "description": keycloakRoleDetails.roleDescription
  });
  
  var config = {
    method: 'post',
    url: 'https://apps.belgesakla.com/auth/admin/realms/Monachus/roles',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${bearerToken}`
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    dispatch(fetchKeycloakRoles())
  })
  .catch(function (error) {
    console.log(error);
  });


}

