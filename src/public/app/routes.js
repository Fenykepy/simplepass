import React from 'react'
import { render } from 'react-dom'
import { Route, Redirect, IndexRoute } from 'react-router'

import App from './containers/App'
import Login from '../user/containers/Login'
import Register from '../user/containers/Register'

export default () => {
  return (
    <Route>
      <Route path="/" component={App}>
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Register} />
      </Route>
    </Route>
  )
}


