import axios from 'axios'

export const addRuleCategory = (ruleCategoryData = []) => async (dispatch, getState) => {

  var data = JSON.stringify({
    "id": ruleCategoryData.id,
    "name": ruleCategoryData.name,
    "description": ruleCategoryData.description
  });
  
  var config = {
    method: 'post',
    url: 'http://164.90.232.177:3000/metadata_categories',
    headers: { 
      'accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  const response = await axios(config)
  if (response) {
        dispatch({ type: "ADD_RULE_CATEGORY", payload: JSON.parse(response.config.data) });
      }
}

export const fetchRuleCategory = () =>
async (dispatch, getState) => {

  var config = {
    method: 'get',
    url: 'http://164.90.232.177:3000/metadata_categories',
    headers: { 
      'accept': 'application/json', 
      'Range-Unit': 'items'
    }
  };
  
  const response = await axios(config)
    if (response) {
        dispatch({ type: "FETCH_RULE_CATEGORY", payload: response.data });
      }
}

export const deleteRuleCategory = (ruleCategoryId = "") => async (dispatch, getState) => {


var config = {
  method: 'delete',
  url: `http://164.90.232.177:3000/metadata_categories?id=eq.${ruleCategoryId}`,
  headers: { 
    'accept': 'application/json'
  }
};

const response = await axios(config)

if (response.status === 204) {
  dispatch({ type: "DELETE_RULE_CATEGORY", payload: ruleCategoryId });
} 
if (response.status === 409) {
  toast.success(`Silmeye İzin Yok`);
} 
}

export const updateRuleCategory = (ruleCategoryData = []) => async (dispatch, getState) => {

  var data = JSON.stringify({
    "name": ruleCategoryData.name,
    "description": ruleCategoryData.description
  });

var config = {
  method: 'patch',
  url: `http://164.90.232.177:3000/metadata_categories?id=eq.${ruleCategoryData.id}`,
  headers: { 
    'accept': 'application/json', 
    'Content-Type': 'application/json'
  },
  data : data
};

const response = await axios(config)
dispatch({ type: "UPDATE_CATEGORY", payload: ruleCategoryData });
}