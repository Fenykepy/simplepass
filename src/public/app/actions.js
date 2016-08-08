import * as types from './actionsTypes'

// actions creators


export function setDocumentTitle(title) {
  document.title = title + ' - SimplePass'
}

export function defineMasterPassphrase(passphrase) {
  return function(dispatch, getState) {
    // set default json
    // encrypt json
    // store ejson in state
    // send ejson to server
    // store passphrase in state
    // launch timeout
  }
}



