import React, { Component } from 'react'

import { connect } from 'react-redux'

import { appSelector } from '../selectors'

import Login from '../../user/containers/Login'

class App extends Component {
  
  render () {
    return Login
    // if user is not authenticated,
    // show login screen

    // else 
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(appSelector)(App)
