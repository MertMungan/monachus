import axios from "axios";

export const fetchMetaDataEvents = () => async (dispatch) => {
  var config = {
    method: "get",
    url: "http://164.90.232.177:3000/metadata_events",
    headers: {
      accept: "application/json",
    },
  };

  const response = await axios(config);
  if (response) {
    dispatch({ type: "FETCH_META_EVENT_DATA", payload: response.data });
  }
};

export const addMetaDataEvents = (metaEventData = []) => async (dispatch, getState) => {
    const underscoreId = (metaEventData.id).replaceAll("-","_")
    var data = {
        "id": underscoreId,
        "name": metaEventData.name,
        "description": metaEventData.description,
        "metadata": metaEventData.fields
      };
    
      var config = {
        method: 'post',
        url: 'http://164.90.232.177:3000/metadata_events',
        headers: { 
          'accept': 'application/json', 
        },
        data: data
      };
    
      const response = await axios(config);
      if (response) {
        dispatch({ type: "ADD_META_EVENT", payload: response.data });
      }
  }

  export const updateMetaDataEvents = (metaEventData = []) => async (dispatch, getState) => {
    const underscoreId = (metaEventData.id).replaceAll("-","_")
    var data = {
        "id": underscoreId,
        "name": metaEventData.name,
        "description": metaEventData.description,
        "metadata": metaEventData.fields
      };
    
      var config = {
        method: 'patch',
        url: `http://164.90.232.177:3000/metadata_events?id=eq.${underscoreId}`,
        headers: { 
          'accept': 'application/json', 
        },
        data: data
      };
    
      const response = await axios(config)
      dispatch({ type: "UPDATE_METADATA_RULE", payload: metaEventData });
  }

export const deleteMetaDataEvents = (metaEventDataId = "") => async (dispatch, getState) => {

  var config = {
    method: 'delete',
    url: `http://164.90.232.177:3000/metadata_events?id=eq.${metaEventDataId}`,
    headers: { }
  };
  
  const response = await axios(config);
  if (response.status === 204) {
    dispatch({ type: "DELETE_META_EVENT_DATA", payload: metaEventDataId });
  } 
  if (response.status === 409) {
    toast.success(`Silmeye İzin Yok`);
  }
}
  