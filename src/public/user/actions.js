import * as types from './actionsTypes'

import Fetch from '../app/http'

// actions creators

// Logging in
function requestLogin() {
  return {
    type: types.REQUEST_LOGIN
  }
}

function requestLoginSuccess(user) {
  return {
    type: types.REQUEST_LOGIN_SUCCESS,
    user
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
      dispatch(requestLoginSuccess(json))
    })
    .catch(error => {
      return error.response.json().then(json => {
        // store error in state
        console.log('login failure')
        dispatch(requestLoginFailure(json))
        // throw error to display it later
        throw error
      })
    })
  }
}





