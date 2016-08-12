const base64url = {}


base64url.escape = function(str) {
  // remove leading equals "="
  return str.replace(/=+$/, '')
    // replace "/" by "_"
    .replace(/\//g, '_')
    // replace "+" by "-"
    .replace(/\+/g, '-')
}

base64url.unescape = function(str) {
  // add leading equals "="
  return (str + '==='.slice((str.length + 3) % 4))
    // replace "-" by '+'
    .replace(/\-/g, '+')
    // replace "_" by "/"
    .replace(/_/g, '/')
}


base64url.encode = function(str) {
  return this.escape(btoa(str))
}

base64url.decode = function(str) {
  return atob(this.unescape(str))
}

export default base64url
