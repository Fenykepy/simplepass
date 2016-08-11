import * as types from './actionsTypes'

import Fetch from '../app/http'
import browserHistory from 'react-router/lib/browserHistory'

// actions creators

// Fetching user
function requestUser() {
  return {
    type: types.REQUEST_USER
  }
}

function requestUserSuccess(user) {
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

function shouldFetchUser(state) {
  let user = state.user
  if (! user) return true
    if (user.is_authenticated || user.is_fetching ||
       user.is_logging_in || user.is_registering) return false
  return true
}

export function fetchUserIfNeeded() {
  // fetch user if it's not done yet
  return (dispatch, getState) => {
    if (shouldFetchUser(getState())) {
      return dispatch(fetchUser())
    }
    // else return a resolved promise
    return new Promise((resolve, reject) =>
      resolve({user: getState().user.user}))
  }
}

function fetchUser() {
  // fetch current user data
  return function(dispatch) {
    // start request
    dispatch(requestUser())
    // return a promise
    return Fetch.get('/api/user/')
      .then(json =>
        dispatch(requestUserSuccess(json))
      )
      .catch(error => {
        // store error in state
        dispatch(requestUserFailure(error))
        throw error
      })
  }
}



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
    .then(json =>
      dispatch(requestLoginSuccess(json))
    )
    .catch(error => {
      error.response.json().then(json => {
        // store error in state
        dispatch(requestLoginFailure(json))
      })
    })
  }
}


// logging out
function requestLogout() {
  return {
    type: types.REQUEST_LOGOUT
  }
}

function requestLogoutSuccess() {
  return {
    type: types.REQUEST_LOGOUT_SUCCESS
  }
}

function requestLogoutFailure() {
  return {
    type: types.REQUEST_LOGOUT_FAILURE
  }
}

export function logout() {
  /*
   * We need a request to log user out
   * as auth cookie cannot be manipulated client side
   */
  return function(dispatch) {
    // start request
    dispatch(requestLogout())
    //return a promise
    return Fetch.get('/api/user/logout/')
    .then(() => {
        browserHistory.push('/')
        return dispatch(requestLogoutSuccess())
    })
    .catch(error => {
      dispatch(requestLogoutFailure())
      throw error
    })
  }
}



// registering
function requestRegister() {
  return {
    type: types.REQUEST_REGISTER
  }
}

function requestRegisterSuccess(user) {
  return {
    type: types.REQUEST_REGISTER_SUCCESS,
    user
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



