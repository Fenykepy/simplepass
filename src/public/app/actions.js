import * as types from './actionsTypes'

import crypto from './crypto'


import {
  setConfigUser,
  setConfigEmail,
} from '../keychain/actions'


// actions creators


export function setDocumentTitle(title) {
  document.title = title + ' - SimplePass'
}

function setPassphrase(passphrase) {
  return {
    type: types.SET_PASSPHRASE,
    passphrase
  }
}

/* return keychain as JSON */
function grabJSONKeychain(state) {
  return JSON.stringify(state.keychain)
}

/* encrypt keychain to EJSON */
function encryptKeychain(keychain, passphrase) {
  return crypto.string2ejson(keychain, passphrase)
}

/* to sync keychain with ejson store and server */
export function syncKeychain() {
  return function(dispatch, getState) {
    let state = getState() 
    return encryptKeychain(
      grabJSONKeychain(state),
      state.status.passphrase
    )
    .then(EJSON => {
      // store ejson in state
      // send ejson to server
    })
  }
}


/* At first use of simplepass */
export function init(passphrase) {
  return function(dispatch, getState) {
    let state = getState()
    // store passphrase in state
    dispatch(setPassphrase(passphrase))
    // set user in keychain config
    dispatch(setConfigUser(state.user.user.username))
    dispatch(setConfigEmail(state.user.user.email))

    // sync crypt ejson and sync it with state and server
    dispatch(syncKeyChain())
  }
}



