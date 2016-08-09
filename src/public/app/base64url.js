const base64url = {}


function escape(str) {
  // remove leading equals "="
  return str.replace(/=+$/, '')
    // replace "/" by "_"
    .replace(/\//g, '_')
    // replace "+" by "-"
    .replace(/\+/g, '-')
}

function unescape(str) {
  // add leading equals "="
  return (str + '==='.slice((str.length + 3) % 4))
    // replace "-" by '+'
    .replace(/\-/g, '+')
    // replace "_" by "/"
    .replace(/_/g, '/')
}


base64url.encode = function(str) {
  return escape(btoa(str))
}

base64url.decode = function(str) {
  return atob(unescape(str))
}

export default base64url
