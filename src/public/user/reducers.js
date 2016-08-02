import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_FAILURE,
  REQUEST_VERIFY_TOKEN,
  REQUEST_VERIFY_TOKEN_SUCCESS,
  REQUEST_VERIFY_TOKEN_FAILURE,
  LOGOUT,
} from './actionsTypes'

function user(state = {}, action) {
  switch (action.type) {
    case REQUEST_TOKEN:
      return Object.assign({}, state, {
        is_fetching_token: true,
        token_fetched: false
      })
    case REQUEST_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        is_authenticated: true,
        is_fetching_token: false,
        token_fetched: true,
        user: action.user
      })
    case REQUEST_TOKEN_FAILURE:
      return Object.assign({}, state, {
        is_authenticated: false,
        is_fetching_token: false,
        token_fetched: false,
      })
    case REQUEST_VERIFY_TOKEN:
      return Object.assign({}, state, {
        is_verifying_token: true,
      })
    case REQUEST_VERIFY_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        is_verifying_token: false,
        is_authenticated: true,
      })
    case REQUEST_VERIFY_TOKEN_FAILURE:
      return Object.assign({}, state, {
        is_verifying_token: false,
        is_authenticated: false,
      })
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export default user
