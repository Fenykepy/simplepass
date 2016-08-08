import {
  REQUEST_EJSON,
  REQUEST_EJSON_SUCCESS,
  REQUEST_EJSON_FAILURE,
} from './actionsTypes'

import {
  REQUEST_LOGOUT
} from '../user/actionsTypes'

function ejson(state={}, action) {
  switch (action.type) {
    case REQUEST_EJSON:
      return Object.assign({}, state, {
        is_fetching: true,
        fetched: false
      })
    case REQUEST_EJSON_SUCCESS:
      return Object.assign({}, state, {
        is_fetching: false,
        fetched: true,
        receivedAT: action.receivedAt,
        ejson: action.ejson
      })
    case REQUEST_EJSON_FAILURE:
      return Object.assign({}, state, {
        is_fetching: false,
        fetched: false,
        errors: action.errors
      })
    case REQUEST_LOGOUT:
      return {}
    default:
      return state
  }
}

export default ejson
