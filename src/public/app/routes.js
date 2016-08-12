import React from 'react'
import { render } from 'react-dom'

import Route from 'react-router/lib/Route'

import AuthenticationRequired from '../user/containers/AuthenticationRequired'
import App from './containers/App'
import Login from '../user/containers/Login'
import Register from '../user/containers/Register'
import Passwords from '../keychain/containers/Passwords'

export default () => {
  return (
    <Route>
      <Route path="/" component={App}>
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Register} />
        <Route path="/passwords/" component={AuthenticationRequired(Passwords)} />
      </Route>
    </Route>
  )
}


