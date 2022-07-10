const initialState = {
  searchableAttributes: [],
  typoTolerance: {},
  indexLanguages: [],
  queryLanguages: [],
  ignorePlural: [],
  optionalWords: [],
  separatorChars: [],
  proximity: 1,
  hitsPerPage: 20,
  paginationLimited: 1000,
  attributesToRetrieve: []
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SEARCH':
      return action.payload
    case 'ADD_SEARCH':
      return action.payload
    case 'UPDATE_SEARCH':
      return action.payload
    case 'REMOVE_SEARCH':
      return initialState
    default:
      return state
  }
}

export default searchReducer
