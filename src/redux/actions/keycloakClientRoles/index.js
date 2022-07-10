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
