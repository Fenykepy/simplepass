import { combineReducers } from 'redux'

import ejson from '../ejson/reducers'

const rootReducer = combineReducers({
  ejson,
})

export default rootReducer
