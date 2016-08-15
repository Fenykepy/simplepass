import React from 'react'
import { render } from 'react-dom'

import Route from 'react-router/lib/Route'

import AuthenticationRequired from 'public/user/containers/AuthenticationRequired'
import App from 'public/app/containers/App'
import Login from 'public/user/containers/Login'
import Register from 'public/user/containers/Register'
import PasswordsList from 'public/keychain/containers/PasswordsList'
import NotesList from 'public/keychain/containers/NotesList'
import CardsList from 'public/keychain/containers/CardsList'

export default () => {
  return (
    <Route>
      <Route path="/" component={App}>
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Register} />
        <Route path="/passwords/" component={AuthenticationRequired(PasswordsList)} />
        <Route path="/notes/" component={AuthenticationRequired(NotesList)} />
        <Route path="/bank-cards/" component={AuthenticationRequired(CardsList)} />
      </Route>
    </Route>
  )
}


