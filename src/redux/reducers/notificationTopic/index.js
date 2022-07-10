const initialState = [
  {
    id: "1",
    topicName: "Oguz",
    name: "Ozcan",
    description: "asdas",
    showAuto: false,
    email: "Allowed",
    messaging: "Allowed",
    mobilePush: "Allowed",
    sms: "Allowed",
    webPush: "Allowed",
    webhook: "Allowed",
  },
];

const notificationTopicReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TOPIC_DATA":
      return action.payload;
    case "ADD_DATA":
      // action payload manipülasyonu gerekli olabilir.
      return [...state, action.payload[0]];
    case "UPDATE_DATA":

      const index = state.findIndex(
        (item) => item.path === action.payload[0].path
      );
      state[index] = action.payload[0];
      return [...state];
    case "ADD_PUBLISH_DATA":

    case "DELETE_DATA":
      const index2 = state.findIndex((item) => item.path === action.payload);
      state.splice(index2, 1);
      return [...state];
    default:
      return state;
  }
};

export default notificationTopicReducer;
