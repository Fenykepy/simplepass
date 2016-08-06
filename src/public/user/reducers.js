import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILURE,
  REQUEST_REGISTER,
  REQUEST_REGISTER_SUCCESS,
  REQUEST_REGISTER_FAILURE,
  LOGOUT,
} from './actionsTypes'

function user(state = {}, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        is_authenticated: false,
        is_logging_in: true,
      }
    case REQUEST_LOGIN_SUCCESS:
      return {
        is_authenticated: true,
        is_logging_in: false,
        data: action.data
      }
    case REQUEST_LOGIN_FAILURE:
      return {
        is_authenticated: false,
        is_logging_in: false,
        errors: action.errors
      }
    case REQUEST_REGISTER:
      return {
        is_authenticated: false,
        is_registering: true,
      }
    case REQUEST_REGISTER_SUCCESS:
      return {
        is_authenticated: true,
        is_registering: false,
        data: action.data
      }
    case REQUEST_REGISTER_FAILURE:
      return {
        is_authenticated: false,
        is_registering: false,
        errors: action.errors
      }
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export default user
