import React from 'react'


export const firebaseConfig = (apiKey = "",projectId="",senderId="",appId="",measurementId = "") => {

  return {
    apiKey: apiKey,
    authDomain: `${projectId}.firebaseapp.com`,
    // The value of databaseURL depends on the location of the database
    // databaseURL: 'https://database_name.firebaseio.com/',
    projectId: projectId,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: senderId,
    appId: appId,
    // For Firebase JavaScript SDK v7.20.0 and later, measurementId is an optional field
    // measurementId: {measurementId}
  }
}

