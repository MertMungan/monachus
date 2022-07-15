import axios from 'axios'

export const getRealmClients = async () => {
  const bearerToken = JSON.parse(
    localStorage.getItem('userAccessToken')
  ).userAccessToken

  var config = {
    method: 'get',
    url: 'https://apps.belgesakla.com/auth/admin/realms/Monachus/clients',
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  }
  const tesAMK = await axios(config)
  if (tesAMK) return tesAMK.data
}

export const fetchKeycloakClientRoles = () => async (dispatch, getState) => {
  const allClientofRealm = await getRealmClients()
  let realmClients = allClientofRealm
  let choosenClient = {}
  const bearerToken = JSON.parse(
    localStorage.getItem('userAccessToken')
  ).userAccessToken

  const ClientName = JSON.parse(localStorage.getItem('userClientId')).userName
  if (realmClients?.length > 0) {
    choosenClient = realmClients.find(
      (client) => client.clientId === ClientName
    )
    
    localStorage.setItem('ClientName_Id', choosenClient.id)

    var config = {
      method: 'get',
      url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/clients/${choosenClient.id}/roles`,
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    }

    axios(config)
      .then(function (response) {
        dispatch({
          type: 'FETCH_KEYCLOAK_CLIENT_ROLES',
          payload: response.data
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const createKeycloakClientRoles =
  (clientRoleData = []) =>
  async (dispatch, getState) => {
    const allClientofRealm = await getRealmClients()
    let realmClients = allClientofRealm
    let choosenClient = {}
    const bearerToken = JSON.parse(
      localStorage.getItem('userAccessToken')
    ).userAccessToken

    const ClientName = JSON.parse(localStorage.getItem('userClientId')).userName
    if (realmClients?.length > 0) {
      choosenClient = realmClients.find(
        (client) => client.clientId === ClientName
      )

      var data = JSON.stringify({
        name: clientRoleData.roleName,
        description: clientRoleData.roleDescription,
        composite: false,
        clientRole: true,
        containerId: '31'
      })

      var config = {
        method: 'post',
        url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/clients/${choosenClient.id}/roles`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`
        },
        data: data
      }

      axios(config)
        .then(function (response) {
          dispatch(fetchKeycloakClientRoles())
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  export const updateKeycloakClientRoles =(roleDetails = [], keycloakRoleDetails = []) => async (dispatch, getState) => {

    const allClientofRealm = await getRealmClients()
    let realmClients = allClientofRealm
    let choosenClient = {}
    const bearerToken = JSON.parse(localStorage.getItem('userAccessToken')).userAccessToken

    const ClientName = JSON.parse(localStorage.getItem('userClientId')).userName
    if (realmClients?.length > 0) {
      choosenClient = realmClients.find(
        (client) => client.clientId === ClientName
      )

  var data = JSON.stringify({
    "id": keycloakRoleDetails.id,
    "name": roleDetails.roleName,
    "description": roleDetails.roleDescription,
    "composite": false,
    "clientRole": true,
    "containerId": keycloakRoleDetails.containerId,
    "attributes": {}
  });
  
  var config = {
    method: 'put',
    url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/clients/${choosenClient.id}/roles/${roleDetails.roleName}`,
    headers: { 
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${bearerToken}`
    },
    data : data
  };
  axios(config)
.then(function (response) {
  dispatch(fetchKeycloakClientRoles())
})
.catch(function (error) {
  console.log(error);
});
  }}

export const deleteKeycloakClientRoles =(selectedRole = []) => async (dispatch, getState) => {
    const allClientofRealm = await getRealmClients()
    let realmClients = allClientofRealm
    let choosenClient = {}
    const bearerToken = JSON.parse(
      localStorage.getItem('userAccessToken')
    ).userAccessToken

    const ClientName = JSON.parse(localStorage.getItem('userClientId')).userName
    if (realmClients?.length > 0) {
      choosenClient = realmClients.find(
        (client) => client.clientId === ClientName
      )
      var config = {
        method: 'delete',
        url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/clients/${choosenClient.id}/roles/${selectedRole}`,
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      }

      axios(config)
        .then(function (response) {
          dispatch(fetchKeycloakClientRoles())
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
