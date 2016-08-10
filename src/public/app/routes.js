import React from 'react'
import { render } from 'react-dom'

import Route from 'react-router/lib/Route'

import App from './containers/App'
import Login from '../user/containers/Login'
import Register from '../user/containers/Register'

export default () => {
  return (
    <Route>
      <Route path="/" component={App}>
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Register} />
        <Route path="/passwords/" component={<div />} />
        <Route path="/notes/" component={<div />} />
        <Route path="/bank-cards/" component={<div />} />
      </Route>
    </Route>
  )
}


