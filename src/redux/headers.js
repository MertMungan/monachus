export const headers = () => ({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
})

export const userHeaders = () => ({
  'X-UserId': JSON.parse(localStorage.getItem('userId'))?.userId || '',
  'X-UserName':
    JSON.parse(localStorage.getItem('userUserName'))?.userName || '',
  'X-UserRealm': JSON.parse(localStorage.getItem('userRealm'))?.userRealm || '',
  'X-UserAccessToken':
    JSON.parse(localStorage.getItem('userAccessToken'))?.userAccessToken || ''
})
