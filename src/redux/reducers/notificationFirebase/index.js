const initialState = [];

const notificationFirebaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FIREBASE_DATA":
    // ADD EKLENECEK, ŞİMDİLİK ADD_FIREBASE_DATA'DA FETCH_FIREBASE_DATA YAPIYORUZ
    case "FETCH_FIREBASE_DATA":
      return action.payload;
    case "UPDATE_FIREBASE_DATA":
      let temp = Object.entries(state.configured).map(([k, v]) => {
        if (k === action.payload.id) {
          let newProp = {
            condition: action.payload.condition,
            enabled: action.payload.conditionEnable,
            id: action.payload.id,
            priority: parseInt(action.payload.priority),
            properties: {
              projectId: action.payload.projectID,
              credentials: action.payload.credentials,
            },
            status: v.status,
            test: action.payload.testMode,
            type: v.type,
          };
          return newProp;
        } else {
          return v;
        }
      });
      let newState = temp.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
      return { ...state, configured: newState };
    case "DELETE_FIREBASE_DATA":
    // DELETE EKLENECEK, ŞİMDİLİK DELETE_FIREBASE_DATA'DA FETCH_FIREBASE_DATA YAPIYORUZ
    default:
      return state;
  }
};

export default notificationFirebaseReducer;
