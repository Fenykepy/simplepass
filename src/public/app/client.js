// import a promise polyfill
require('es6-promise').polyfill();
// import less files
//require('../less/controller.less')


import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStoreWithMiddleware } from './store'
import rootReducer from './reducers'

import App from './containers/App'

import { fetchEjsonIfNeeded } from '../ejson/actions'

let store = createStoreWithMiddleware(rootReducer)

// every time state changes, log it

/*
let unsubscribe = store.subscribe(() =>
  console.log('state', store.getState())
)
*/

// try to get user's ejson
store.dispatch(fetchEjsonIfNeeded())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
