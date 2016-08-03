import {
  REQUEST_USER,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAILURE,
  LOGOUT,
} from './actionsTypes'

function user(state = {}, action) {
  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, state, {
        is_authenticated: false,
        is_fetching_user: true,
      })
    case REQUEST_USER_SUCCESS:
      return Object.assign({}, state, {
        is_authenticated: true,
        is_fetching_user: false,
        user: action.user
      })
    case REQUEST_USER_FAILURE:
      return Object.assign({}, state, {
        is_authenticated: false,
        is_fetching_user: false,
      })
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export default user
