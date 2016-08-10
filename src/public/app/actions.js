import * as types from './actionsTypes'

import crypto from './crypto'


import { loadConfig } from '../keychain/actions'
import { updateEjson } from '../ejson/actions'



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

function lockKeychain() {
  return {
    type: types.LOCK_KEYCHAIN,
  }
}

function unlockKeychain() {
  return {
    type: types.UNLOCK_KEYCHAIN,
  }
}

/* return keychain as JSON */
function getJSONKeychain(state) {
  return JSON.stringify(state.keychain)
}

/* return passphrase */
function getPassphrase(state) {
  return state.status.passphrase
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
      getJSONKeychain(state),
      getPassphrase(state)
    )
    .then(EJSON => {
      // store ejson in state and send it to server
      dispatch(updateEjson(EJSON))
    })
  }
}

/* At first use of simplepass */
export function init(passphrase) {
  return function(dispatch, getState) {
    let state = getState()
    // store passphrase in state
    dispatch(setPassphrase(passphrase))
    // unlock keychain
    dispatch(unlockKeychain())
    // set user in keychain config
    dispatch(loadConfig({
      timeout: state.keychain.config.timeout,
      username: state.user.user.username,
      email: state.user.user.email,
    }))
    // sync crypt ejson and sync it with state and server
    dispatch(syncKeychain())
  }
}



