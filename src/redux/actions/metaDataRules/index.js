import axios from "axios";

export const fetchMetaDataRules = () => async (dispatch) => {
  var config = {
    method: "get",
    url: "http://164.90.232.177:3000/metadata_rules",
    headers: {
      accept: "application/json",
    },
  };

  const response = await axios(config);
  if (response) {
    dispatch({ type: "FETCH_META_RULE_DATA", payload: response.data });
  }
};

export const addMetaDataRules = (metaRuleData = []) => async (dispatch, getState) => {
  console.log("metaRuleData",metaRuleData)
    var data = JSON.stringify({
        "id": metaRuleData.id,
        "name": metaRuleData.name,
        "description": metaRuleData.description,
        "category_id": metaRuleData.assignedCategory,
        "metadata": metaRuleData.builderInfo[0],
        "jsonlogic": metaRuleData.builderInfo[1].logic,
        "assigned_event": metaRuleData.assignedEvent,
        "enabled": true,
        "valid_from": "2022-07-21T15:35:38.868899",
        "valid_thru": null
    });
    
    var config = {
      method: 'post',
      url: 'http://164.90.232.177:3000/metadata_rules',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }



export const deleteMetaDataRules = (metaRulesDataId = "") => async (dispatch, getState) => {

  var config = {
    method: 'delete',
    url: `http://164.90.232.177:3000/metadata_rules?id=eq.${metaRulesDataId}`,
    headers: { }
  };
  
  const response = await axios(config);
  if (response.status === 204) {
    dispatch({ type: "DELETE_META_RULE_DATA", payload: metaRulesDataId });
  } 
  if (response.status === 409) {
    toast.success(`Silmeye İzin Yok`);

  }
}

export const updateMetaDataRule = (metaRuleData = []) => async (dispatch, getState) => {

  console.log("metaRuleData",metaRuleData)
    var data = JSON.stringify({
        "name": metaRuleData.name,
        "description": metaRuleData.description,
        "category_id": metaRuleData.assignedCategory,
        "metadata": metaRuleData.builderInfo[0],
        "jsonlogic": metaRuleData.builderInfo[1].logic,
        "assigned_event": metaRuleData.assignedEvent,
        "enabled": true,
        "valid_from": "2022-07-21T15:35:38.868899",
        "valid_thru": null
    });

var config = {
  method: 'patch',
  url: `http://164.90.232.177:3000/metadata_rules?id=eq.${metaRuleData.id}`,
  headers: { 
    'accept': 'application/json', 
    'Content-Type': 'application/json'
  },
  data : data
};

const response = await axios(config)
dispatch({ type: "UPDATE_METADATA_RULE", payload: metaRuleData });
}
  