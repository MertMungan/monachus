/* eslint-disable */
import axios from 'axios'
import { headers, userHeaders } from '../../headers'
import { toast } from "react-toastify";

// const userIdLocal = JSON.parse(localStorage.getItem('userId'))
// const userRealmLocal = JSON.parse(localStorage.getItem('userRealm'))
// const userUserNameLocal = JSON.parse(localStorage.getItem('userUserName'))
// const userAccessToken = JSON.parse(localStorage.getItem('userAccessToken'))
// const userClientIdLocal = JSON.parse(localStorage.getItem('userClientId'))

// let userId = userIdLocal.userId
// let userRealmName = userRealmLocal.userRealm
// let userUserName = userUserNameLocal.userName
// let userToken = userAccessToken.userAccessToken
// let userClientName = userClientIdLocal.userName

// AXIOS INSTANCE CREATE
// const instance = axios.create({
//   baseURL: process.env.REACT_APP_DEST,
//   timeout: 5000,
//   headers: { ...headers(), ...userHeaders() }
// })

const dummyData = [
  {
    name: 'ömer',
    id: 213,
    label: 'ömer'
  },
  {
    name: 'mert',
    id: 4343,
    label: 'mert'
  }
]

// AXIOS INSTANCE CREATE
// BENZERİ VAR ŞU AN DA ÇAĞIRILMIYOR
export const fetchCollections = () => async (dispatch, getState) => {
  let testRed = getState().collectionsReducer
  if (testRed) {
  // toast.success("Collection Fetched!");
  dispatch({ type: 'GET_COLLECTION', payload: testRed })
} else { 
  // toast.warn("Collection Couldn't Fetched!");

}
}
export const addCollection =
  (collectionItem = {}) =>
    async (dispatch) => {
      //   istediğim fomatta mı
      //1- gelen datanın tippini ve doğruluğunu kısaca kontrol et
      //2- back-end axion//Http request attribute
      //3- Bana sunucudan dönen cevaba göre haraket et
      //3.1- sunucu hatası 3.2- sistemde yavaşlama olaiblir beklemem gereekebilir
      //4- istediğim formatta mı yoksa işlem yapmam gerekiyor mu?
      // 5- Gelen Datayı dispatch et

      var data = collectionItem
      if (data) {
        toast.success('Collection Added!');
        dispatch({ type: 'ADD_COLLECTION', payload: data })
      } else {
        toast.warn("COLLECTION COULDN'T ADDED!");
      }
    }

/* eslint-disable */
