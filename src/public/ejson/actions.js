import * as types from './actionsTypes'

import Fetch from '../app/http'

// action creators

function requestEjson() {
  return {
    type: types.REQUEST_EJSON
  }
}

function receiveEjson(ejson) {
  console.log('ejson', ejson)
  return {
    type: types.REQUEST_EJSON_SUCCESS,
    ejson,
    receivedAt: Date.now()
  }
}

function requestEjsonFailure(errors) {
  return {
    type: types.REQUEST_EJSON_FAILURE,
    errors
  }
}

function shouldFetchEjson(state) {
  let ejson = state.ejson
  if (! ejson) return true
  if (ejson.is_fetching || ejson.fetched) return false
  return true
}

export function fetchEjsonIfNeeded() {
  // fetch ejson if it's not done yet
  return (dispatch, getState) => {
    if (shouldFetchEjson(getState())) {
      return dispatch(fetchEjson())
    }
    // else return a resolved promise
    return new Promise((resolve, reject) =>
      resolve({ejson: getState().ejson.ejson}))
  }
}


function fetchEjson() {
  // fetch ejson for current user
  return function(dispatch) {
    // start request
    dispatch(requestEjson())
    // return a promise
    return Fetch.get('/api/ejson/')
      .then(ejson =>
          dispatch(receiveEjson(ejson.ejson))
      )
      .catch(error => {
        return error.response.json().then(json => {
          // store error json in state  
          dispatch(requestEjsonFailure(json))
          throw error
        })
      })
  }
}

export function syncKeychain() {
  /* TODO */
  // throw error if locked
  // convert keychain as json
  // encrypt json to ejson
  // store ejson into state
  // send ejson to server
  return
}

export function unlockKeychain() {
  /* TODO */
  // pass if unlocked
  // decrypt ejson to json
  // parse json
  // load json to keychain
  return
}
