const initialState = []

const notificationSmtpReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SMTP_DATA":
    // ADD EKLENECEK, ŞİMDİLİK ADD_SMTP_DATA'DA FETCH_SMTP_DATA YAPIYORUZ
    case "FETCH_SMTP_DATA":
      return action.payload;
    case "UPDATE_SMTP_DATA":

      let temp = Object.entries(state.configured).map(([k, v]) => {
        if (k === action.payload.id) {
          let newProp = {
            condition: action.payload.condition,
            enabled: action.payload.conditionEnable,
            id: action.payload.id,
            priority: parseInt(action.payload.priority),
            properties: {
              host: action.payload.host,
              port: action.payload.port,
              username: action.payload.username,
              password: action.payload.password,
              fromEmail: action.payload.fromEmail,
              fromName: action.payload.fromName,
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
    case "DELETE_SMTP_DATA":
    // DELETE EKLENECEK, ŞİMDİLİK DELETE_FIREBASE_DATA'DA FETCH_FIREBASE_DATA YAPIYORUZ
    default:
      return state;
  }
}

export default notificationSmtpReducer