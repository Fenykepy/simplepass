import * as types from 'public/app/actionsTypes'

import crypto from 'public/crypto'


import {
  loadJSON,
  loadConfig,
} from 'public/keychain/actions'
import { updateEjson } from 'public/ejson/actions'



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

export function lockKeychain() {
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

/* return passphrase from state */
function getPassphrase(state) {
  return state.status.passphrase
}

/* return ejson from state */
function getEjson(state) {
  return state.ejson.ejson
}

/* encrypt keychain to EJSON */
function encryptKeychain(keychain, passphrase) {
  return crypto.string2ejson(keychain, passphrase)
}

/* decryt keychain */
function decryptKeychain(ejson, passphrase) {
  return crypto.ejson2string(ejson, passphrase)
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

/*
 * At first use of simplepass:
 * set ejson with default config
 */
export function init(passphrase) {
  return function(dispatch, getState) {
    let state = getState()
    // store passphrase in state
    dispatch(setPassphrase(passphrase))
    // set keychain as unlocked
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

/* Unlock keychain */
export function loadKeychain(passphrase) {
  return function(dispatch, getState) {
    let state = getState()
    // store passphrase in state
    dispatch(setPassphrase(passphrase))
    // decryt ejson
    return decryptKeychain(
      getEjson(state),
      passphrase
    )
    .then(json => {
      // store keychain in state
      dispatch(loadJSON(json))
      // set keychain as unlocked
      dispatch(unlockKeychain())
    })
  }
}
