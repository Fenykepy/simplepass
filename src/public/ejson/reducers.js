import {
  REQUEST_EJSON,
  REQUEST_EJSON_SUCCESS,
  REQUEST_EJSON_FAILURE,
  REQUEST_UPDATE_EJSON,
  REQUEST_UPDATE_EJSON_SUCCESS,
  REQUEST_UPDATE_EJSON_FAILURE,
} from './actionsTypes'

import {
  REQUEST_LOGOUT
} from 'public/user/actionsTypes'

function ejson(state={}, action) {
  switch (action.type) {
    case REQUEST_EJSON:
      return {...state,
        is_fetching: true,
        fetched: false
      }
    case REQUEST_EJSON_SUCCESS:
      return {...state,
        is_fetching: false,
        fetched: true,
        receivedAT: action.receivedAt,
        ejson: action.ejson
      }
    case REQUEST_EJSON_FAILURE:
      return {...state,
        is_fetching: false,
        fetched: false,
        errors: action.errors
      }
    case REQUEST_UPDATE_EJSON:
      return {...state,
        is_posting: true,
      }
    case REQUEST_UPDATE_EJSON_FAILURE:
      return {...state,
        is_posting: false,
      }
    case REQUEST_UPDATE_EJSON_SUCCESS:
      return {...state,
        is_posting: false,
        ejson: action.ejson
      }
    case REQUEST_LOGOUT:
      return {}
    default:
      return state
  }
}

export default ejson
