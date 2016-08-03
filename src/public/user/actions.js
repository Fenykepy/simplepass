import * as types from './actionsTypes'

import Fetch from '../app/http'

// actions creators

// Logging in
function requestUser() {
  return {
    type: types.REQUEST_USER
  }
}

function receiveUser(user) {
  return {
    type: types.REQUEST_USER_SUCCESS,
    user
  }
}

function requestUserFailure(errors) {
  return {
    type: types.REQUEST_USER_FAILURE,
    errors
  }
}

export function login(credentials) {
  /*
   * try to get token with given credentials
   */
  return function(dispatch) {
    // start request
    dispatch(requestUser())

    // retun a promise
    return Fetch.post('/api/user/login/',
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        JSON.stringify(credentials)
    )
    .then(json => {
      dispatch(receiveUser(json))
    })
    .catch(error => {
      return error.response.json().then(json => {
        // store error in state
        dispatch(requestUserFailure(json))
        // throw error to display it later
        throw error
      })
    })
  }
}





