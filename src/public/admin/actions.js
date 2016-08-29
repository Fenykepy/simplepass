import * as types from './actionsTypes'

import Fetch from 'public/http'

// actions creators

// Fetching users number
function requestUsersNumber() {
  return {
    type: types.REQUEST_N_USERS
  }
}

function requestUsersNumberSuccess(n_users) {
  return  {
    type: types.REQUEST_N_USERS_SUCCESS,
    n_users,
    receivedAt: Date.now(),
  }
}

function requestUsersNumberFailure(errors) {
  return {
    type: types.REQUEST_N_USERS_FAILURE,
    errors
  }
}

export function fetchUsersNumber() {
  // fetch number of simplepass users
  return function(dispatch) {
    // start request
    dispatch(requestUsersNumber())
    // return a promise
    return Fetch.get('/api/admin/users/number/')
      .then(json =>
        dispatch(requestUsersNumberSuccess(json.n_users))
      )
      .catch(error => {
        // store error in state
        dispatch(requestUsersNumberFailure(error))
        throw error
      })
  }
}
