export const isJsonString = (str = '') => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const exampleJsonData = () => [
  {
    firstname: 'Jimmie',
    lastname: 'Barninger',
    zip_code: 12345
  },
  {
    firstname: 'John',
    lastname: 'Doe',
    zip_code: null
  }
]
