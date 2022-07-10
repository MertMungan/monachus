import axios from 'axios'

export const fetchKeycloakUsers = () => async (dispatch, getState) => {
  const bearerToken = JSON.parse(
    localStorage.getItem('userAccessToken')
  ).userAccessToken

  var config = {
    method: 'get',
    url: 'https://apps.belgesakla.com/auth/admin/realms/Monachus/users',
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  }

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      dispatch({ type: 'FETCH_KEYCLOAK_USERS', payload: response.data })
    })
    .catch(function (error) {
      console.log(error)
    })
}

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

export const fetchKeycloakUsersByMail = async (keycloakUserMail = '') => {
  debugger
  const bearerToken = JSON.parse(
    localStorage.getItem('userAccessToken')
  ).userAccessToken

  var config = {
    method: 'get',
    url: 'https://apps.belgesakla.com/auth/admin/realms/Monachus/users',
    Authorization: `Bearer ${bearerToken}`
  }
  console.log('config: ', config)

  const getCreatedUserData = await axios(config)
  if (getCreatedUserData) {
    return getCreatedUserData.data
  }
}

export const deleteKeycloakUser =
  (keycloakUserId = '') =>
  async (dispatch, getState) => {
    const bearerToken = JSON.parse(
      localStorage.getItem('userAccessToken')
    ).userAccessToken

    var config = {
      method: 'delete',
      url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/users/${keycloakUserId}`,
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        dispatch(fetchKeycloakUsers())
      })
      .catch(function (error) {
        console.log(error)
      })
  }

export const addClientRoleToUser =
  (userId = '', keycloakRoleData = []) =>
  async (dispatch, getState) => {
    debugger
    const ClientName = JSON.parse(localStorage.getItem('userClientId')).userName
    let realmClients = await getRealmClients()
    let choosenClient = realmClients.find(
      (client) => client.clientId === ClientName
    )

    let clientRoles = fetchKeycloakClientRoles()
    let list = []

    for (let index = 0; index < clientRoles.length; index++) {
      for (let minedx = 0; minedx < keycloakRoleData.length; minedx++) {
        if (clientRoles[index].name === keycloakRoleData[minedx]) {
          list.push(clientRoles[index])
        }
      }
    }
    console.log('====================================')
    console.log('list: ' + list)
    console.log('====================================')
    const bearerToken = JSON.parse(
      localStorage.getItem('userAccessToken')
    ).userAccessToken

    var data = JSON.stringify(list)

    var config = {
      method: 'post',
      url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/users/${userId}/role-mappings/clients/${choosenClient.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`
      },
      data: data
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

export const createKeycloakUser =
  (keycloakUserData = []) =>
  async (dispatch, getState) => {
    const bearerToken = JSON.parse(
      localStorage.getItem('userAccessToken')
    ).userAccessToken
    let user = {}
    var data = JSON.stringify({
      username: keycloakUserData.userName,
      enabled: true,
      totp: false,
      emailVerified: true,
      firstName: keycloakUserData.firstName,
      lastName: keycloakUserData.lastName,
      email: keycloakUserData.userEmail,
      disableableCredentialTypes: [],
      requiredActions: [],
      notBefore: 0,
      access: {
        manageGroupMembership: true,
        view: true,
        mapRoles: true,
        impersonate: true,
        manage: true
      },
      credentials: [
        {
          type: 'password',
          value: keycloakUserData.userPassword,
          temporary: false
        }
      ],
      realmRoles: ['mb-user']
    })

    var config = {
      method: 'post',
      url: 'https://apps.belgesakla.com/auth/admin/realms/Monachus/users',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`
      },
      data: data
    }

    const isUserCreated = await axios(config)
    if (isUserCreated) {
      debugger
      dispatch(fetchKeycloakUsers())
      const usuers = getState().keycloakUsersReducer
      console.log('====================================')
      console.log('usuers: ', usuers)
      console.log('====================================')
    }

    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data))
    //     user = fetchKeycloakUsersByMail(keycloakUserData.userEmail)
    //     if (user?.Id) {
    //       addClientRoleToUser(user.Id)
    //     }
    //     dispatch(fetchKeycloakUsers())
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  }
