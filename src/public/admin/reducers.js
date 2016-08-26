import { combineReducers } from 'redux'

import {
  REQUEST_N_USERS,
  REQUEST_N_USERS_SUCCESS,
  REQUEST_N_USERS_FAILURE,
} from 'public/admin/actionsTypes'

function n_users(state={}, action) {
  switch (action.type) {
    case REQUEST_N_USERS:
      return {
        ...state,
        is_fetching: true,
        fetched: false,
      }
    case REQUEST_N_USERS_SUCCESS:
      return {
        is_fetching: false,
        fetched: true,
        n_users: action.n_users,
        receivedAt: action.receivedAt,
      }
    case REQUEST_N_USERS_FAILURE:
      return {
        ...state,
        is_fetching: false,
        fetched: false,
        errors: action.errors,
      }
    default:
      return state
  }
}

const admin = combineReducers({
  n_users,
})

export default admin
