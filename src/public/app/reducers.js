import {
  LOCK_KEYCHAIN,
  UNLOCK_KEYCHAIN,
  SET_PASSPHRASE,
} from 'public/app/actionsTypes'

import {
  REQUEST_LOGOUT
} from 'public/user/actionsTypes'


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

export default status
