import { combineReducers } from 'redux'

import status from 'public/app/reducers'
import ejson from 'public/ejson/reducers'
import user from 'public/user/reducers'
import keychain from 'public/keychain/reducers'
import modal from 'public/modal/reducers'
import admin from 'public/admin/reducers'


const rootReducer = combineReducers({
  status,
  user,
  ejson,
  keychain,
  modal,
  admin,
})

export default rootReducer
