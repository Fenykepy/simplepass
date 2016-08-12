// import a promise polyfill
require('es6-promise').polyfill();
// import less files
require('less/controller.less')


import React from 'react'
import { render } from 'react-dom'

import { getCookie } from 'cookie-manager'
import { Provider } from 'react-redux'
import { createStoreWithMiddleware } from 'public/store'
import rootReducer from 'public/rootReducer'

import browserHistory from 'react-router/lib/browserHistory'
import Router from 'react-router/lib/Router'

import getRoutes from 'public/routes'

import { fetchUserIfNeeded } from 'public/user/actions'
import { fetchEjsonIfNeeded } from 'public/ejson/actions'

let store = createStoreWithMiddleware(rootReducer)

// every time state changes, log it


let unsubscribe = store.subscribe(() =>
  console.log('state', store.getState())
)


// we check if user may be authenticated or not
let authenticated = getCookie('authenticated')

if (authenticated) {
  // fetch users data if needed
  store.dispatch(fetchUserIfNeeded())
  // fetch ejson
  store.dispatch(fetchEjsonIfNeeded())
}

const routes = <Router history={browserHistory} routes={getRoutes()} />

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('root')
)
