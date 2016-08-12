
export function arrayContains(value, array) {
  return array.indexOf(value) != -1 ? true : false
}

export function objectValues(object) {
  return Object.keys(object).reduce((prev, cur) =>
      prev.push(object[cur]) && prev, [])
}
