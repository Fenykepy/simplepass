import { combineReducers } from 'redux'

import ejson from '../ejson/reducers'
import user from '../user/reducers'

import { SET_STATE } from './actionsTypes'

function state(state=null, action) {
  switch (action.type) {
    case SET_STATE:
      return action.state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  state,
  user,
  ejson,
})

export default rootReducer
