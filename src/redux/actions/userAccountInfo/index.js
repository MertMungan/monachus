import React from 'react'
import keycloak from '../../../Keycloak'

export const getUserAccount = () => async (dispatch, getState) => {
const permissionArray = ["cep", "dashboard","settings","logs"];
function givePermission(array) {
    let abilities = [];
for (let index = 0; index < array?.length; index++) {
  const element = array[index];
  switch (element) {
    case "cep":
      abilities.push({
        action: "read",
        subject: element
    })
      break;
    case "dashboard":
      abilities.push({
        action: "read",
        subject: element
    })
      break;
    default:
      break;
  }
}
  return abilities
  }
  let userInfo = await keycloak.loadUserInfo();
  let userProfile = await keycloak.loadUserProfile();


  let userInformation = {}
  let deneme = givePermission(permissionArray)
if (userInfo && userProfile) {
    userInformation = {
    userId: keycloak.subject,
    userRealm: keycloak.realm,
    userName: keycloak.profile?.username,
    userClientId: keycloak.clientId,
    userFirstName: keycloak.profile?.firstName,
    userLastName: keycloak.profile?.lastName,
    role: 'client',
    ability: deneme,
  }
}
  if (userInformation) {
    dispatch({ type: "GET_USER_INFO", payload: userInformation });
  }
}
