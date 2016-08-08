import { combineReducers } from 'redux'

import ejson from '../ejson/reducers'
import user from '../user/reducers'
import keychain from '../keychain/reducers'


import {
  LOCK,
  UNLOCK,
  SET_PASSPHRASE,
  TIMEOUT,
} from './actionsTypes'

import {
  REQUEST_LOGOUT
} from '../user/actionsTypes'


const default_status = {
  locked: true,
}

function status(state=default_status, action) {
  switch (action.type) {
    case LOCK:
      return {...state,
        locked: true
      }
    case UNLOCK:
      return {...state,
        locked: false
      }
    case SET_PASSPHRASE:
      return {...state,
        passphrase: action.passphrase
      }
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
  keychain,
})

export default rootReducer
