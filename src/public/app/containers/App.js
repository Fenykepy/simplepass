import React, { Component } from 'react'

import { connect } from 'react-redux'

import {
  LOGIN,
  REGISTER,
  HOME,
  AUTH_FREE_STATES,
} from '../states'

import { appSelector } from '../selectors'

import { setState } from '../actions'
import Login from '../../user/containers/Login'

class App extends Component {
  
  render () {
    // injected by connect call
    const {
      dispatch,
      state,
      user,
    } = this.props

    // if user is not authenticated and state is not in authentication free states
    // redirect to login state

    return (<Login/>)
    // if user is not authenticated,
    // show login screen

    // else 
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(appSelector)(App)
