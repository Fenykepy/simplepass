// import a promise polyfill
require('es6-promise').polyfill();
// import less files
//require('../less/controller.less')


import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStoreWithMiddleware } from './store'
import rootReducer from './reducers'

let store = createStoreWithMiddleware(rootReducer)

render(
  <Provider store={store}>
    <div></div>
  </Provider>,
  document.getElementById('root')
)
