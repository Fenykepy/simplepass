import { combineReducers } from 'redux'

import status from 'public/app/reducers'
import ejson from 'public/ejson/reducers'
import user from 'public/user/reducers'
import keychain from 'public/keychain/reducers'
import modal from 'public/modal/reducers'



const rootReducer = combineReducers({
  status,
  user,
  ejson,
  keychain,
  modal,
})

export default rootReducer
