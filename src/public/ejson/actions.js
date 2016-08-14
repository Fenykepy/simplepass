import * as types from './actionsTypes'

import { saveAs } from 'file-saver'

import Fetch from 'public/http'

// action creators

function requestEjson() {
  return {
    type: types.REQUEST_EJSON
  }
}

function receiveEjson(ejson) {
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
        throw error
        return error.response.json().then(json => {
          // store error json in state  
          dispatch(requestEjsonFailure(json))
        })
      })
  }
}


// updating ejson

function requestUpdateEjson() {
  return {
    type: types.REQUEST_UPDATE_EJSON
  }
}

function requestUpdateEjsonSuccess(ejson) {
  return {
    type: types.REQUEST_UPDATE_EJSON_SUCCESS,
    ejson
  }
}

function requestUpdateEjsonFailure() {
  return {
    type: types.REQUEST_UPDATE_EJSON_FAILURE,
  }
}

export function updateEjson(ejson) {
  return function(dispatch) {
    // start request
    dispatch(requestUpdateEjson())
    // return a promise
    return Fetch.put('/api/ejson/',
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      JSON.stringify({ejson: ejson})
    )
    .then(response => {
        dispatch(requestUpdateEjsonSuccess(ejson))
    })
    .catch(error => {
      dispatch(requestUpdateEjsonFailure())
      throw error
    })
  }
}

export function saveEjson() {
  // we write ejson in a file to user disk
  return function(dispatch, getState) {
    // grap some data from state
    let state = getState()
    let user = state.user.user.username
    let ejson = state.ejson.ejson
    let date = (new Date()).toJSON()
    let filename = `SIMPLEPASS_${date}_${user}.ejson`
    // We create a new Blob with ejson
    let blob = new Blob([ejson],
      {type: "text/plain;charset=utf-8"}
    )
    // save blob to user harddrive
    saveAs(blob, filename)
  }
}
