import React from 'react'
import { render } from 'react-dom'

import Route from 'react-router/lib/Route'

import AuthenticationRequired from 'public/user/containers/AuthenticationRequired'
import AdminRequired from 'public/user/containers/AdminRequired'
import App from 'public/app/containers/app/App'
import Home from 'public/app/containers/Home'
import Login from 'public/user/containers/Login'
import Register from 'public/user/containers/Register'
import PasswordsList from 'public/keychain/containers/PasswordsList'
import NotesList from 'public/keychain/containers/NotesList'
import CardsList from 'public/keychain/containers/CardsList'
import Admin from 'public/admin/containers/Admin'

export default () => {
  return (
    <Route>
      <Route path="/" component={App}>
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Register} />
        
        <Route component={AuthenticationRequired(Home)}>
          <Route path="/passwords/" component={PasswordsList} />
          <Route path="/notes/" component={NotesList} />
          <Route path="/bank-cards/" component={CardsList} />
        </Route>
        
        <Route path="/admin/" component={AdminRequired(Admin)} />

      </Route>
    </Route>
  )
}


