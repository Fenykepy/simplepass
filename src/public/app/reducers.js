import { combineReducers } from 'redux'

import ejson from '../ejson/reducers'
import user from '../user/reducers'
import keychain from '../keychain/reducers'


import {
  LOCK_KEYCHAIN,
  UNLOCK_KEYCHAIN,
  SET_PASSPHRASE,
} from './actionsTypes'

import {
  REQUEST_LOGOUT
} from '../user/actionsTypes'


const default_status = {
  locked: true,
}

function status(state=default_status, action) {
  switch (action.type) {
    case LOCK_KEYCHAIN:
      return default_status
    case UNLOCK_KEYCHAIN:
      return {...state,
        locked: false
      }
    case SET_PASSPHRASE:
      return {...state,
        passphrase: action.passphrase
      }
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
