import axios from 'axios'

export const getUserWithClientRoles = () => async (dispatch, getState) => {
  const currentUsers = getState().keycloakUsersReducer
  let usersWithClientRoles = []
  const bearerToken = JSON.parse(
    localStorage.getItem('userAccessToken')
  ).userAccessToken
  for (let index = 0; index < currentUsers.length; index++) {
    var config = {
      method: 'get',
      url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/users/${currentUsers[index].id}/role-mappings`,
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    }
    let userAllRoles = await axios(config)
    if (userAllRoles?.data?.clientMappings) {
      console.log(
        'userAllRoles.clientMappings',
        userAllRoles?.data?.clientMappings['auth-monachus']
      )
      usersWithClientRoles.push({
        user: currentUsers[index],
        userRoles: userAllRoles?.data?.clientMappings['auth-monachus']
      })
    }
  }
  dispatch({ type: 'FETCH_KEYCLOAK_USERS_WITH_ROLES', payload: usersWithClientRoles })
}

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
      dispatch(getUserWithClientRoles())
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
    const bearerToken = JSON.parse(
      localStorage.getItem('userAccessToken')
    ).userAccessToken
    var data = JSON.stringify(keycloakRoleData)
    const userClient = localStorage.getItem('ClientName_Id')
    var config = {
      method: 'post',
      url: `https://apps.belgesakla.com/auth/admin/realms/Monachus/users/${userId}/role-mappings/clients/${userClient}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`
      },
      data: data
    }

    const isRolesAdded = await axios(config)
    if (isRolesAdded) {
      console.log('isRolesAdded: ', isRolesAdded)
    }
  }

export const createKeycloakUser =
  (keycloakUserData = [], roles = []) =>
  async (dispatch, getState) => {
    const bearerToken = JSON.parse(
      localStorage.getItem('userAccessToken')
    ).userAccessToken

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
      realmRoles: ['mb_user']
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
    let userId = ''
    if (isUserCreated) {
      userId =
        isUserCreated.headers.location.split('/')[
          isUserCreated.headers.location.split('/').length - 1
        ]

      const clientRoles = getState().keycloakRolesClinetReducer

      let keycloakRoleData = []

      for (let index = 0; index < roles.length; index++) {
        for (let minedx = 0; minedx < clientRoles.length; minedx++) {
          if (roles[index] === clientRoles[minedx].name) {
            keycloakRoleData.push(clientRoles[minedx])
          }
        }
      }
      dispatch(addClientRoleToUser(userId, keycloakRoleData))
    }
  }
