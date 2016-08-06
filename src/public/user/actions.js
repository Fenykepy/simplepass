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
      dispatch(requestLoginSuccess(json))
    })
    .catch(error => {
      return error.response.json().then(json => {
        // store error in state
        dispatch(requestLoginFailure(json))
        // throw error to display it later
        throw error
      })
    })
  }
}


// registering
function requestRegister() {
  return {
    type: types.REQUEST_REGISTER
  }
}

function requestRegisterSuccess(data) {
  return {
    type: types.REQUEST_REGISTER_SUCCESS,
    data
  }
}

function requestRegisterFailure(errors) {
  return {
    type: types.REQUEST_REGISTER_FAILURE,
    errors
  }
}

export function register(user) {
  /*
   * Try to create new user with given data
   */
  return function(dispatch) {
    // start request
    dispatch(requestRegister())

    // return a promise
    return Fetch.post('/api/user/',
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        JSON.stringify(user)
    )
    .then(json => {
      dispatch(requestRegisterSuccess(json))
    })
    .catch(error => {
      return error.response.json().then(json => {
        // store error in state
        dispatch(requestRegisterFailure(json))
        // throw error to display it later
        throw error
      })
    })
  }
}



