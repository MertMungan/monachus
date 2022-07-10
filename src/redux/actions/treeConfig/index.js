import axios from 'axios'
import { treeConfig } from '../../../views/dashboard/querybuilder/treeConfig'
import MaterialConfig from 'react-awesome-query-builder/lib/config/material'

export const fetchTree = () => async (dispatch) => {
  const data = localStorage.getItem('tree-config')
  if (data) {
    dispatch({ type: 'GET_CONFIG', payload: data })
  } else {
    dispatch({ type: 'GET_CONFIG', payload: treeConfig(MaterialConfig) })
  }
}

export const addTree = (data) => async (dispatch) => {
  if (data) {
    localStorage.setItem('tree-config', data)
    dispatch({ type: 'ADD_CONFIG', payload: data })
  }
}

export const updateTree = (data) => async (dispatch) => {}

export const deleteTree = (id) => async (dispatch) => {
  if (id) {
    return null
  } else {
    localStorage.removeItem('tree-config')
    dispatch({ type: 'REMOVE_CONFIG', payload: {} })
  }
}
