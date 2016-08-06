import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILURE,
  REQUEST_REGISTER,
  REQUEST_REGISTER_SUCCESS,
  REQUEST_REGISTER_FAILURE,
  REQUEST_USER,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAILURE,
  REQUEST_LOGOUT,
} from './actionsTypes'

function user(state = {}, action) {
  switch (action.type) {
    case REQUEST_USER:
      return {
        is_authenticated: false,
        is_fetching: true,
      }
    case REQUEST_USER_SUCCESS:
      return {
        is_authenticated: true,
        is_fetching: false,
        user: action.user
      }
    case REQUEST_USER_FAILURE:
      return {
        is_authenticated: false,
        is_fetching: false,
        user_errors: action.errors
      }
    case REQUEST_LOGIN:
      return {
        is_authenticated: false,
        is_logging_in: true,
      }
    case REQUEST_LOGIN_SUCCESS:
      return {
        is_authenticated: true,
        is_logging_in: false,
        user: action.user
      }
    case REQUEST_LOGIN_FAILURE:
      return {
        is_authenticated: false,
        is_logging_in: false,
        login_errors: action.errors
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
        user: action.user
      }
    case REQUEST_REGISTER_FAILURE:
      return {
        is_authenticated: false,
        is_registering: false,
        registration_errors: action.errors
      }
    case REQUEST_LOGOUT:
      return {}
    default:
      return state
  }
}

export default user
