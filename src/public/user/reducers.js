import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILURE,
  LOGOUT,
} from './actionsTypes'

function user(state = {}, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        is_authenticated: false,
        is_logging_in: true,
      })
    case REQUEST_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        is_authenticated: true,
        is_logging_in: false,
        data: action.data
      })
    case REQUEST_LOGIN_FAILURE:
      return Object.assign({}, state, {
        is_authenticated: false,
        is_logging_in: false,
        errors: action.errors
      })
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export default user
