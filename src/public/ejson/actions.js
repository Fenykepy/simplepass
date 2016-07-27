import * as types from './actionsTypes'

import Fetch from '../app/http'

// action creators

export function requestEjson() {
  return {
    type: types.REQUEST_EJSON
  }
}

export function receiveEjson(ejson) {
  return {
    type: types.REQUEST_EJSON_SUCCESS,
    ejson,
    receivedAt: Date.now()
  }
}

export function requestEjsonFailure(error) {
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
    if (shouldFetchEjson(getState()) {
      return dispatch(fetchEjson())
    }
    // else return a resolved promise
    return new Promise((resolve, reject) =>
      resolve({ejson: getState().ejson.ejson}))
  }
}


function fetchEjson() {
  // fetch ejson for current user
  return function(dispatch, getState()) {
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
  }
}


