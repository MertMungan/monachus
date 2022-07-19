/*eslint-disable */

import axios from 'axios'
import initValue from '../../../views/dashboard/querybuilder/initValue'
import { headers } from '../events/utils'

const eventIDLocal = localStorage.getItem('eventID')

let eventId = eventIDLocal

const instance = axios.create({
  baseURL: process.env.REACT_APP_DEST
})

// FETCHRULE FONKSİYONU LOCAL'DEN EVENT ID ALIYOR KULLANILMASI MANTIKLI DEĞİL. fetchAllRules VEYA fetchRuleById'i KULLAN
export const fetchRule = () => async (dispatch) => {
  const localTreeValues = await instance.get(
    `/rules/list`,
    {
      params: {
        eventID: eventId
      }
    },
    {
      headers: { ...headers }
    }
  )
  const parsedLocalTreeValues = localTreeValues.data
  if (parsedLocalTreeValues) {
    dispatch({ type: 'GET_RULE', payload: parsedLocalTreeValues })
  } else {
    dispatch({ type: 'GET_RULE', payload: {} })
  }
}

export const fetchAllRules = () => async (dispatch) => {
  const localTreeValues = await instance.get(`/rules/all`, {
    headers: { ...headers }
  })
  const parsedLocalTreeValues = localTreeValues.data
  if (parsedLocalTreeValues) {
    dispatch({ type: 'GET_ALL_RULES', payload: parsedLocalTreeValues })
  } else {
    dispatch({ type: 'GET_ALL_RULES', payload: {} })
  }
}
export const fetchRuleById =
  (id = '') =>
  async (dispatch) => {
    const localTreeValues = await instance.get(
      `/rules/list`,
      {
        params: {
          eventID: id
        }
      },
      {
        headers: { ...headers }
      }
    )
    const parsedLocalTreeValues = localTreeValues.data
    if (parsedLocalTreeValues) {
      dispatch({ type: 'GET_RULE_ID', payload: parsedLocalTreeValues })
    } else {
      dispatch({ type: 'GET_RULE_ID', payload: {} })
    }
  }

export const addRule =
  (id, eventID, name, desc, category, fields, ruleLogicFormat) =>
  async (dispatch) => {
    // console.log(
    //   "gelen Data",
    //   id,
    //   eventID,
    //   name,
    //   desc,
    //   category,
    //   fields,
    //   ruleLogicFormat
    // );
    const jsonLOGIC = ruleLogicFormat?.logic
    const response1 = await instance.get(`/rules/list`, {
      params: {
        eventID: eventId
      },
      data: {
        id: id,
        eventID: eventID,
        name: name,
        desc: desc,
        category: category,
        fields: fields,
        ruleLogicFormat: jsonLOGIC
      }
    })
    let localTreeValues = response1.data.data
    if (localTreeValues?.length > 0) {
      const response2 = await instance.post(`/rules/add`, [
        {
          id,
          eventID,
          name,
          desc,
          category,
          fields,
          ruleLogicFormat: jsonLOGIC
        }
      ])
      if (response2.status === 200) {
        const response = await instance.get(`/rules/list`, {
          params: {
            id: id
          }
        })
        fetchRuleById()
      }

      //dispatch({ type: "ADD_RULE", payload: [...response2.data.data] });
    } else {
      localTreeValues = [
        {
          id,
          eventID,
          name,
          desc,
          category,
          fields,
          ruleLogicFormat: jsonLOGIC
        }
      ]

      const response3 = await instance.post(`/rules/add`, localTreeValues)
      if (response3.status === 200) {
        fetchRule()
      }
    }
  }

export const updateRule =
  (id, name, desc, category, fields, ruleLogicFormat) => async (dispatch) => {
    // the endpoint is "/rules/:id"
    // the endpoint gets two parameters, one being the id of the rule and the other being the request body
    // the request body is an object with the following properties:
    // id: the id of the rule
    // eventID: the id of the event
    // name: the name of the rule
    // desc: the description of the rule
    // fields: the fields of the rule
    // ruleLogicFormat: the rule logic format of the rule

    const jsonLOGIC = ruleLogicFormat.logic
    const response = await instance.put(`/rules/${id}`, {
      name: name,
      desc: desc,
      category: category,
      // add fields as an array
      fields: [fields],

      ruleLogicFormat: jsonLOGIC
    })
    if (response.status === 200) {
      dispatch({ type: 'UPDATE_QUERY', payload: response.data })
    } else {
      dispatch({ type: 'UPDATE_QUERY', payload: {} })
    }
  }

export const deleteRule = (id) => async (dispatch) => {
  if (id) {
    return null
  } else {
    const response5 = await instance.delete(`/rules/delete`, { data: { id } })
    if (response5.status === 200) dispatch({ type: 'REMOVE_RULE', payload: {} })
  }
}
/*eslint-disable */
