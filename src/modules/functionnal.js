
export function arrayContains(value, array) {
  // return true if value is in array, false otherwise
  return array.indexOf(value) != -1 ? true : false
}

export function objectValues(object) {
  // return all own values of an object in an array
  return Object.keys(object).reduce((prev, cur) =>
      prev.push(object[cur]) && prev, [])
}

export function sortByProperty(array, prop) {
  // return a new array sorted by property name
  return array.slice().sort((a, b) => {
    if (a[prop] > b[prop]) return 1
    if (a[prop] < b[prop]) return -1
    return 0
  })
}
