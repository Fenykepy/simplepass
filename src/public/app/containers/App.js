import React, { Component } from 'react'

import { connect } from 'react-redux'

import { arrayContains } from '../../../utils/helpers'

import {
  LOGIN,
  REGISTER,
  HOME,
  AUTH_FREE_STATES,
} from '../states'

import { appSelector } from '../selectors'

import { setState } from '../actions'

import Login from '../../user/containers/Login'
import Register from '../../user/containers/Register'

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
    if (! this.props.user.is_authenticated && 
        ! arrayContains(this.props.state, AUTH_FREE_STATES)) {
      this.props.dispatch(setState(LOGIN))
      return (<Login />)
    }
    
    switch (this.props.state) {
      case LOGIN:
        return (<Login />)
      case REGISTER:
        return (<Register />)
      default:
        return (<Login />)
    }
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(appSelector)(App)
