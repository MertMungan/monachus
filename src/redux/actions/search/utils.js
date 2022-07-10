export const initialState = {
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
// prettier-ignore
export const searchConfig = () => JSON.parse(localStorage.getItem('searchConfig'))
