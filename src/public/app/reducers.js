import { combineReducers } from 'redux'

import ejson from '../ejson/reducers'
import user from '../user/reducers'


import {
  LOCK,
  UNLOCK,
  SET_PASSPHRASE,
  TIMEOUT,
} from './actionsTypes'

import {
  REQUEST_LOGOUT
} from '../user/actionsTypes'


let default_status = {
  locked: true,
}

function status(state=default_status, action) {
  switch (action.type) {
    case LOCK:
      return Object.assign({}, state, {
        locked: true
      })
    case UNLOCK:
      return Object.assign({}, state, {
        locked: false
      })
    case SET_PASSPHRASE:
      return Object.assign({}, state, {
        passphrase: action.passphrase
      })
    case TIMEOUT:
      return default_status
    case REQUEST_LOGOUT:
      return default_status
    default:
      return state
  }
}

const rootReducer = combineReducers({
  status,
  user,
  ejson,
})

export default rootReducer
