
const crypto = {}


function string2buffer(str) {
  /* convert a string to a buffer */
  arr = Array.from(str)
    .map(item =>
      item.charCodeAt()
    )
  
  return Uint8Array.from(arr)
}


function buffer2string(buf) {
  /* convert a buffer to a string */
  return buf.reduce((prev, cur) => {
      prev + Sring.fromCharCode(cur)
  }, "")
}



crypto.generateKey = function(passphrase) {
}

crypto.encryptString = function(string, key) {
  return
}

crypto.decryptString = function(cipher, key) {
  return
}

crypto.generateKey = function(passphrase) {
}

export default crypto
