import * as types from './actionsTypes'

import Fetch from '../app/http'

// actions creators

// Logging in
function requestLogin() {
  return {
    type: types.REQUEST_LOGIN
  }
}

function requestLoginSuccess(data) {
  return {
    type: types.REQUEST_LOGIN_SUCCESS,
    data
  }
}

function requestLoginFailure(errors) {
  return {
    type: types.REQUEST_LOGIN_FAILURE,
    errors
  }
}

export function login(credentials) {
  /*
   * try to get token with given credentials
   */
  return function(dispatch) {
    // start request
    dispatch(requestLogin())
    
    // return a promise
    return Fetch.post('/api/user/login/',
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        JSON.stringify(credentials)
    )
    .then(json => {
      console.log('login success', json)
      dispatch(requestLoginSuccess(json))
      // set state to Home

    })
    .catch(error => {
      return error.response.json().then(json => {
        // store error in state
        console.log('login failure', json)
        dispatch(requestLoginFailure(json))
        // throw error to display it later
        throw error
      })
    })
  }
}





