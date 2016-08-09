import base64url from './base64url'

const CRYPT_ALGO = "AES-CBC"
const crypto = {}


function string2buffer(str) {
  /* convert a string to a buffer */
  let arr = Array.from(str)
    .map(item =>
      item.charCodeAt()
    )
  
  return Uint8Array.from(arr)
  
  // to be used when widely supported:
  //new TextEncoder("utf-8").encode(str)
}


function buffer2string(buf) {
  /* convert a buffer to a string */
  return buf.reduce((prev, cur) => {
      return prev + String.fromCharCode(cur)
  }, "")
  // to be used when widely supported:
  //new TextDecoder("utf-8").decode(buf)
}

function generateVector() {
  /* generate a randow IV for encrypting */
  return window.crypto.getRandomValues(new Uint8Array(16))
}

function setEjsonHeader(vector) {
  return base64url.encode(JSON.stringify(
    {
      alg: CRYPT_ALGO,
      // we convert vector to array to serialize it
      iv: Array.from(vector),
      type: "EJSON"
    }
  ))
}

function hex(buffer) {
  // from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
  var hexCodes = [];
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
    // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
    var value = view.getUint32(i)
    // toString(16) will give the hex representation of the number without padding
    var stringValue = value.toString(16)
    // We use concatenation and slice for padding
    var padding = '00000000'
    var paddedValue = (padding + stringValue).slice(-padding.length)
    hexCodes.push(paddedValue);
  }

  // Join all the hex strings into one
  return hexCodes.join("");
}


crypto.digestString = function(algo, string) {
  /* return a promise which resolve in a digest of a string */
  return window.crypto.subtle.digest(algo, string2buffer(string))
}

crypto.sha1 = function(string) {
  /* return a promise which resolve in a sha1 digest of a string */
  return this.digestString('SHA-1', string)
}

crypto.sha1hex = function(string) {
  /* return a promise which resolve in a sha1 digest HEX of a string */
  return this.sha1(string).then(hash => hex(hash))
}

crypto.sha256 = function(string) {
  /* return a promise which resolve in a sha256 digest of a string */
  return this.digestString('SHA-256', string)
}

crypto.sha256hex = function(string) {
  /* return a promise which resolve in a sha256 digest HEX of a string */
  return this.sha256(string).then(hash => hex(hash))
}

crypto.generateKey = function(passphrase) {
  // we generate a hash of passphrase
  return this.sha256(passphrase).then(hash =>
    window.crypto.subtle.importKey("raw", hash, {name: CRYPT_ALGO}, false, ["encrypt", "decrypt"])
  )
}

crypto.encrypt = function(clear_text, key, iv) {
  /* return a promise which resolve in a cipher as string */
  return this.generateKey(key).then(generated_key => {
    return window.crypto.subtle.encrypt(
      {name: CRYPT_ALGO, iv},
      generated_key,
      string2buffer(clear_text)
    )
    .then(buf =>
      // convert array buffer to string
      buffer2string(new Uint8Array(buf))
    )
  })
}

crypto.decrypt = function(cipher, key, algo, iv) {
  /* return a promise which resolve in a clear text */
  return this.generateKey(key).then(generated_key => {
    return window.crypto.subtle.decrypt(
      {name: algo, iv},
      generated_key,
      string2buffer(cipher)
    )
  })
}

crypto.string2ejson = function(clear_text, key) {
  /* return a promise which resolve in a EJSON string */

  // we generate a new vector
  let vector = generateVector()
  // we generate base64 encoded cipher header
  let header = setEjsonHeader(vector)
  // we generate cipher and return ejson when done
  return this.encrypt(clear_text, key, vector)
  .then(cipher => {
    console.log('raw cipher', cipher)
    return header + "." + base64url.encode(cipher)
  })
}

crypto.ejson2string = function(ejson, key) {
  
  return
}


export default crypto
