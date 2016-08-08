import * as types from './actionsTypes'

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

export function defineMasterPassphrase(passphrase) {
  return function(dispatch, getState) {
    // encrypt json
    // store ejson in state
    // send ejson to server
    // store passphrase in state
    dispatch(setPassphrase(passphrase))
    // launch timeout
  }
}



